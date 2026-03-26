interface TodoformProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  addTodo: () => void;
}

function TodoForm({inputValue, setInputValue, addTodo}: TodoformProps) {
  return (
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
  )
}

export default TodoForm;