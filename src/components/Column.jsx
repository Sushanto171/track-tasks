/* eslint-disable react/prop-types */

import Task from "./Task";
const Column = ({ id, tasks }) => {
  console.log(tasks);
  return (
    <div className="p-4  border rounded bg-base-300">
      <h2 className="font-bold mb-2 ">{id}</h2>
      <div>
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
