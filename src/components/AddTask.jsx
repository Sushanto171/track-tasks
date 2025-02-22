import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import useAxiosInstance from "../hooks/useAxiosInstance";
import useTasks from "../hooks/useTasks";

const TaskForm = () => {
  const axiosInstance = useAxiosInstance();
  const { refetch } = useTasks();
  const { user } = useAuth();
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "to-do",
    email: user?.email,
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    setTask({
      title: "",
      description: "",
      category: "to-do",
      email: user?.email,
    });
    // post
    try {
      const { data } = await axiosInstance.post("/tasks", task);
      toast.success(data?.message);
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto my-5">
      <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
        <div className="flex flex-wrap gap-2 ">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            maxLength={50}
            className="input input-bordered w-1/4 min-w-[150px]"
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            maxLength={200}
            className="textarea textarea-bordered w-1/4 min-w-[150px]"
            placeholder="Description"
          />
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="select select-bordered w-1/4 min-w-[150px]"
          >
            <option value="to-do">To-Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
          >
            <AiOutlinePlusCircle className="text-lg" /> Save
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default TaskForm;
