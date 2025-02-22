/* eslint-disable react/prop-types */
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useTasks from "../hooks/useTasks";
import Column from "./Column";

const TaskLayout = ({ socket }) => {
  const { tasks } = useTasks();
  const { notifications, setNotifications } = useAuth();
  const [columns, setColumns] = useState({
    toDo: [],
    InProgress: [],
    done: [],
  });

  useEffect(() => {
    if (tasks.length === 0) return;
    socket.emit("tasks", columns);
  }, [columns, socket, tasks]);

  // notifications
  useEffect(() => {
    const handleNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    };
    socket.on("notification", handleNotification);
    return () => socket.off("notification", handleNotification);
  }, []);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);
  useEffect(() => {
    if (tasks.length === 0) return;
    setColumns({
      toDo: tasks.filter((task) => task.category === "to-do"),
      InProgress: tasks.filter((task) => task.category === "in-progress"),
      done: tasks.filter((task) => task.category === "done"),
    });
  }, [tasks]);

  // Handle Drag
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const fromColumn = findColumn(activeId);
    const toColumn = findColumn(overId);

    if (!fromColumn || !toColumn) return;

    if (fromColumn === toColumn) {
      setColumns((prev) => ({
        ...prev,
        [fromColumn]: arrayMove(
          prev[fromColumn],
          prev[fromColumn].findIndex((item) => item._id === activeId),
          prev[fromColumn].findIndex((item) => item._id === overId)
        ),
      }));
    } else {
      setColumns((prev) => {
        const fromItems = prev[fromColumn].filter(
          (item) => item._id !== activeId
        );
        const movedItem = prev[fromColumn].find(
          (item) => item._id === activeId
        );
        const toItems = [...prev[toColumn]];
        toItems.splice(
          prev[toColumn].findIndex((item) => item._id === overId),
          0,
          movedItem
        );
        return { ...prev, [fromColumn]: fromItems, [toColumn]: toItems };
      });
    }
  };

  // Find Column
  const findColumn = (id) =>
    Object.keys(columns).find((col) =>
      columns[col].some((task) => task._id === id)
    );

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3">
        {Object.keys(columns).map((column) => (
          <Column key={column} id={column} tasks={columns[column]} />
        ))}
      </div>
    </DndContext>
  );
};

export default TaskLayout;
