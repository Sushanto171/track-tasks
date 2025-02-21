import { useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";
import Column from "./Column";

const TaskLayout = () => {
  const { tasks, isLoading } = useTasks();
  const [columns, setColumns] = useState({
    "To-Do": [],
    "In-Progress": [],
    Done: [],
  });

  useEffect(() => {
    if (tasks.length === 0) return;
    setColumns({
      "To-Do": tasks.filter((task) => task.category === "to-do"),
      "In-Progress": tasks.filter((task) => task.category === "in-progress"),
      Done: tasks.filter((task) => task.category === "done"),
    });
  }, [tasks]);

  // if (isLoading) {
  //   return (
  //     <div className="h-screen flex items-center justify-center">
  //       <ImSpinner3 className="animate-spin text-2xl" />
  //     </div>
  //   );
  // }
  return (
    <div className="grid grid-cols-3">
      {Object.keys(columns).map((column) => (
        <Column key={column} id={column} tasks={columns[column]} />
      ))}
    </div>
  );
};

export default TaskLayout;
