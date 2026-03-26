import type { Task } from "../types/Task";

interface TodoListItemProps {
  task: Task;
  buttonLabel: string;
  onButtonClick: (id: number) => void;
}

function TodoListItem({task, buttonLabel, onButtonClick}: TodoListItemProps) {
  return (
    <li key={task.id} className="render-container__item">
      <p className="render-container__item-text">
        {task.text}
      </p>
      <button className="render-container__item-button" onClick={() => onButtonClick(task.id)}>{buttonLabel}</button>
    </li>
  )
}

export default TodoListItem;