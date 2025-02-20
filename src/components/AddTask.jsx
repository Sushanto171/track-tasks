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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
        <div className="flex flex-col gap-4">
          {/* Title Input */}
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            maxLength={50}
            className="input input-bordered w-full"
            placeholder="Task Title (Max 50 chars)"
            required
          />

          {/* Description Input */}
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            maxLength={200}
            className="textarea textarea-bordered w-full"
            placeholder="Task Description (Optional, Max 200 chars)"
          />

          {/* Category Select */}
          <select
            name="category"
            value={task.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="to-do">To-Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
          >
            <AiOutlinePlusCircle className="text-lg" />
            Save Task
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default TaskForm;
