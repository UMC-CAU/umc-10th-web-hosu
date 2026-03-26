import { useState } from "react";
import './index.css';
import type { Task } from "./types/Task";
import TodoForm from "./components/TodoForm";
import TodoListTitle from "./components/TaskListTitle";
import TodoList from "./components/TaskList";

function App() {
  const [todoTasks, settodoTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  console.log(todoTasks)

  // Processing input text
  const getTodoText = (): string => {
    return inputValue.trim();
  }

  // Adding getTodoText in Todo List
  const addTodo = () => {
    const text = getTodoText();
    settodoTasks([
      ...todoTasks,
      { id: Date.now(), text: text }
    ])
  }

  // Change status to complete
  const completeTask = (id: number) => {
    const task = todoTasks.find((todo) => todo.id === id)!;
    settodoTasks(todoTasks.filter((todo) => todo.id !== id))
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

        <TodoForm inputValue={inputValue} setInputValue={setInputValue} addTodo={addTodo} />

        <div className="render-container">
          <div className="render-container__section">
            <TodoListTitle titleLabel="할 일"/>
            <TodoList tasks={todoTasks} buttonLabel="완료" onButtonClick={completeTask} />
          </div>

          <div className="render-container__section">
            <TodoListTitle titleLabel="완료"/>
            <TodoList tasks={doneTasks} buttonLabel="삭제" onButtonClick={deleteTask}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;