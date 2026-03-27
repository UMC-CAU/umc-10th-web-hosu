import type { Task } from "../types/Task";
import { useTodo } from "../contexts/TodoContext";

interface TaskListItemProps {
  task: Task;
  type: "todo" | "done";
}

function TaskListItem({ task, type }: TaskListItemProps) {
  const { completeTask, deleteTask } = useTodo();
  const buttonLabel = type === "todo" ? "완료" : "삭제";
  const onButtonClick = type === "todo" ? completeTask : deleteTask;

  return (
    <li key={task.id} className="render-container__item">
      <p className="render-container__item-text">
        {task.text}
      </p>
      <button className="render-container__item-button" onClick={() => onButtonClick(task.id)}>{buttonLabel}</button>
    </li>
  )
}

export default TaskListItem;