import './index.css';
import { TodoProvider } from './contexts/TodoContext';
import TodoForm from "./components/TodoForm";
import TaskListTitle from "./components/TaskListTitle";
import TaskList from "./components/TaskList";
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function AppContent() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TodoProvider>
      <div className={`p-5 rounded-xl shadow-md w-[350px] text-center ${isDark ? "bg-[#1a1a2e] text-[#e0e0e0]" : "bg-white"}`}>
        <button
          className={`cursor-pointer bg-transparent border-none ${isDark ? "text-white" : ""}`}
          onClick={toggleTheme}
        >
          {isDark ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
        <h1 className={`text-2xl mb-4 ${isDark ? "text-white" : ""}`}>HOSU TODO</h1>
        <TodoForm isDark={isDark} />
        <main className="flex justify-between gap-5">
          <section className={`w-full text-left ${isDark ? "bg-[#1a1a2e]" : ""}`}>
            <TaskListTitle titleLabel="할 일"/>
            <TaskList status="todo" />
          </section>
          <section className={`w-full text-left ${isDark ? "bg-[#1a1a2e]" : ""}`}>
            <TaskListTitle titleLabel="완료"/>
            <TaskList status="done" />
          </section>
        </main>
      </div>
    </TodoProvider>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App;
