import { useTodo } from "../contexts/TodoContext";
import { useTheme } from "../contexts/ThemeContext";

function TodoForm() {
  const { isDark } = useTheme();
  const { inputValue, setInputValue, addTodoTask } = useTodo();

  return (
    <form
      id="todo-form"
      className="flex gap-2.5 mb-5"
      onSubmit={(e) => {
        e.preventDefault();
        addTodoTask();
        setInputValue("");
      }}
    >
      <input
        type="text"
        id="todo-input"
        className={`flex-1 p-2 border rounded-md text-sm ${isDark === "black" ? "bg-[#0f3460] text-[#e0e0e0] border-[#e0e0e0]" : "border-gray-300"}`}
        placeholder="할 일 입력"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white border-none px-3 py-2 cursor-pointer rounded-md transition-colors duration-300 hover:bg-green-700"
      >
        할 일 추가
      </button>
    </form>
  );
}

export default TodoForm;
