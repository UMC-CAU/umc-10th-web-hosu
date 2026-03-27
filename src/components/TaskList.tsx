import TaskListItem from "./TaskListItem"
import { useTodo } from "../contexts/TodoContext";

interface TaskListProps {
  type: "todo" | "done";
}

function TaskList({ type }: TaskListProps) {
  const { todoTasks, doneTasks } = useTodo();
  const tasks = type === "todo" ? todoTasks : doneTasks;

  return (
    <ul id="todo-list" className="render-container__list">
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} type={type} />
      ))}
    </ul>
  )
}

export default TaskList;