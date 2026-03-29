import type { Task } from "../types/Task";
import { useTodo } from "../contexts/TodoContext";

interface TaskListItemProps {
  task: Task;
  status: "todo" | "done";
}

function TaskListItem({ task, status }: TaskListItemProps) {
  const { completeTask, deleteTask } = useTodo();
  const buttonLabel = (status === "todo") ? "완료" : "삭제";
  const handleClick = (status === "todo") ? completeTask : deleteTask;

  return (
    <li
      key={task.id}
      className="flex justify-between items-center p-2 border-b border-gray-200 bg-[#f9f9f9] rounded-md mb-1.5 w-full text-black"
    >
      <p className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis block">
        {task.text}
      </p>
      <button
        className="bg-red-600 text-white border-none px-2.5 py-1.5 cursor-pointer rounded-md text-xs transition-colors duration-300 hover:bg-red-700"
        onClick={() => handleClick(task.id)}
      >
        {buttonLabel}
      </button>
    </li>
  )
}

export default TaskListItem;
