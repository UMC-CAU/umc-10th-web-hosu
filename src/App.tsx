import './index.css';
import { TodoProvider } from './contexts/TodoContext';
import TodoForm from "./components/TodoForm";
import TodoListTitle from "./components/TaskListTitle";
import TodoList from "./components/TaskList";

function App() {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">HOSU TODO</h1>
        <TodoForm />
        <div className="render-container">
          <div className="render-container__section">
            <TodoListTitle titleLabel="할 일"/>
            <TodoList type="todo" />
          </div>
          <div className="render-container__section">
            <TodoListTitle titleLabel="완료"/>
            <TodoList type="done" />
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App;