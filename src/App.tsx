import { useState } from "react";
import './index.css';

interface Task {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Processing input text
  const getTodoText = (): string => {
    return inputValue.trim();
  }

  // Adding getTodoText in Todo List
  const addTodo = () => {
    const text = getTodoText();
    setTodos([
      ...todos,
      { id: Date.now(), text: text }
    ])
  }

  // Change status to complete
  const completeTask = (id: number) => {
    const task = todos.find((todo) => todo.id === id)!;
    setTodos(todos.filter((todo) => todo.id !== id))
    setDoneTasks([...doneTasks, task]);
  }

  // Delete tasks completed
  const deleteTask = (id: number) => {
    setDoneTasks(doneTasks.filter((doneTask) => doneTask.id !== id));
  }

  // Rendering function doesn't need(useState resolved already)

  return (
    <>
      <div className="todo-container">
        <h1 className="todo-container__header">HOSU TODO</h1>

        <form id="todo-form" 
          className="todo-container__form" 
          onSubmit={(e) => 
          {e.preventDefault(); // Reload Prevent
            addTodo(); 
            setInputValue(""); // Reset after adding
        }}>
          <input type="text" 
            id="todo-input" 
            className="todo-container__input" 
            placeholder="할 일 입력" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} 
            required/>
          <button type="submit" className="todo-container__button">할 일 추가</button>
        </form>

        <div className="render-container">
          <div className="render-container__section">
            <h2 className="render-container__title">할 일</h2>
            <ul id="todo-list" className="render-container__list">
              {todos.map((todo) => (
                <li key={todo.id} className="render-container__item">
                  <p className="render-container__item-text">
                    {todo.text}
                  </p>
                  <button className="render-container__item-button" onClick={() => completeTask(todo.id)}>완료</button>
                </li>
            ))}
            </ul>
          </div>

          <div className="render-container__section">
            <h2 className="render-container__title">완료</h2>
            <ul id="done-list" className="render-container__list">
            {doneTasks.map((doneTask) => (
              <li key={doneTask.id} className="render-container__item">
                <p className="render-container__item-text">
                  {doneTask.text}
                </p>
                <button className="render-container__item-button" onClick={() => deleteTask(doneTask.id)}>삭제</button>
              </li>
            ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;