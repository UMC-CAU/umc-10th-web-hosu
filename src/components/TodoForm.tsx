import { useTodo } from "../contexts/TodoContext";


function TodoForm() {
  const { inputValue, setInputValue, addTodoTask } = useTodo();

  return (
    <form id="todo-form" 
          className="todo-container__form" 
          onSubmit={(e) => 
          {e.preventDefault(); // Reload Prevent
            addTodoTask(); 
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
  )
}

export default TodoForm;