interface TaskListTitleProps {
  titleLabel: string;
}

function TaskListTitle({titleLabel}: TaskListTitleProps) {
  return (
    <h2 className="text-lg flex flex-row justify-center">{titleLabel}</h2>
  )
}

export default TaskListTitle;
