/* eslint-disable react/prop-types */
const Task = ({ task }) => {
  return (
    <div className="p-2 bg-base-200  mb-2 cursor-pointer rounded shadow">
      <h4 className="font-medium ">{task.title}</h4>
      <p className="text-sm tracking-wide opacity-90">{task.description}</p>
    </div>
  );
};

export default Task;
