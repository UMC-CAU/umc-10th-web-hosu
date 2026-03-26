interface TodoListTitleProps {
  titleLabel: string;
}

function TodoListTitle({titleLabel}: TodoListTitleProps) {
  return (
    <h2 className="render-container__title">{titleLabel}</h2>
  )
}

export default TodoListTitle;