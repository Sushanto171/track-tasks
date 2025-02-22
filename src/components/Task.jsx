import { useSortable } from "@dnd-kit/sortable";
import toast from "react-hot-toast";
import useAxiosInstance from "../hooks/useAxiosInstance";

/* eslint-disable react/prop-types */
const Task = ({ task }) => {
  const axiosInstance = useAxiosInstance();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <span>Confirm delete?</span>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              deleteHandler(id);
              toast.dismiss(t.id);
            }}
            className="btn btn-xs text-error"
          >
            Yes
          </button>
          <button
            className="btn btn-xs text-success"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-2 bg-base-200 mb-2 cursor-pointer rounded shadow"
    >
      <h4 className="font-medium">{task.title}</h4>
      <p className="text-sm tracking-wide opacity-90">{task.description}</p>
      <button
        onClick={() => handleDelete(task._id)}
        className="btn btn-error btn-outline btn-sm mt-2"
      >
        Delete
      </button>
    </div>
  );
};

export default Task;
