import TaskListItem from "./TaskListItem"
import { useTodo } from "../contexts/TodoContext";

interface TaskListProps {
  status: "todo" | "done";
}

function TaskList({ status }: TaskListProps) {
  const { todoTasks, doneTasks } = useTodo();
  const tasks = (status === "todo") ? todoTasks : doneTasks;

  return (
    <ul id="todo-list" className="list-none p-0 m-0">
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} status={status} />
      ))}
    </ul>
  )
}

export default TaskList;
