import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/Movie";

interface TodoContextType {
  todoTasks: Task[];
  doneTasks: Task[];
  inputValue: string;
  setInputValue: (value: string) => void;
  addTodoTask: () => void;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Adding getTodoText in Todo List
  const addTodoTask = () => {
    const text = inputValue.trim();
    setTodoTasks((prev) => [
      ...prev,
      { id: Date.now(), text: text }
    ])
  }

  // Change status to complete
  const completeTask = (id: number) => {
    const task = todoTasks.find((todoTask) => todoTask.id === id)!;
    setTodoTasks((prev) => prev.filter((todoTask) => todoTask.id !== id))
    setDoneTasks((prev) => [...prev, task]);
  }

  // Delete tasks completed
  const deleteTask = (id: number) => {
    setDoneTasks((prev) => prev.filter((doneTask) => doneTask.id !== id));
  }

  return (
    <TodoContext.Provider value={{ todoTasks, doneTasks, inputValue, setInputValue, addTodoTask, completeTask, deleteTask }}>
      {children}
    </TodoContext.Provider>
  )
}

// Custom Hook : use useTodo() instead useContext(TodoContext)
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodo must be used within TodoProvider");
  return context;
}
