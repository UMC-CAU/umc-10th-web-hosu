import TodoListItem from "./TaskListItem"
import type { Task } from "../types/Task";

interface TodoListProps {
  tasks: Task[];
  buttonLabel: string;
  onButtonClick: (id: number) => void;
}

function TodoList({tasks, buttonLabel, onButtonClick}: TodoListProps) {
  return (
    <ul id="todo-list" className="render-container__list">
      {tasks.map((task) => (
        <TodoListItem key={task.id} task={task} buttonLabel={buttonLabel} onButtonClick={onButtonClick} />
      ))}
    </ul>
  )
}

export default TodoList;