import useTasks from "../hooks/useTasks";

const TaskLayout = () => {
  const { tasks, isLoading } = useTasks();

  return <div key={tasks.length}>Total tasks: {tasks.length}</div>;
};

export default TaskLayout;
