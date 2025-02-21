/* eslint-disable react/prop-types */
import { DndContext, closestCorners, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";

export default function KanbanBoard() {
  const { tasks } = useTasks();

  const [columns, setColumns] = useState({
    "To-Do": tasks.filter((task) => task.category === "to-do"),
    "In-Progress": tasks.filter((task) => task.category === "in-progress"),
    Done: tasks.filter((task) => task.category === "done"),
  });

  useEffect(() => {
    setColumns({
      "To-Do": tasks.filter((task) => task.category === "to-do"),
      "In-Progress": tasks.filter((task) => task.category === "in-progress"),
      Done: tasks.filter((task) => task.category === "done"),
    });
  }, [tasks]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
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

        return {
          ...prev,
          [fromColumn]: fromItems,
          [toColumn]: toItems,
        };
      });
    }
  };

  const findColumn = (itemId) =>
    Object.keys(columns).find((col) =>
      columns[col].some((task) => task._id === itemId)
    );

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4">
        {Object.keys(columns).map((col) => (
          <Column key={col} id={col} tasks={columns[col]} />
        ))}
      </div>
    </DndContext>
  );
}

function Column({ id, tasks }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="p-4 w-1/3 border rounded bg-gray-100">
      <h2 className="font-bold mb-2">{id}</h2>
      <SortableContext
        items={tasks.map((task) => task._id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}

function Task({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
      }}
      className="p-2 bg-white shadow mb-2 cursor-pointer"
    >
      <p>{task.title}</p>
      <p>{task.description}</p>
    </div>
  );
}
