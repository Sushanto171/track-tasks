/* eslint-disable react/prop-types */

import { useDraggable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";
const Column = ({ id, tasks }) => {
  const { setNodeRef } = useDraggable({ id });

  //   console.log(tasks);
  return (
    <div
      ref={setNodeRef}
      className="p-4 border rounded bg-base-300 min-h-[100px]"
    >
      {tasks.length === 0 && <p>Drop Here</p>}
      <h2 className="font-bold mb-2 ">{id}</h2>
      <SortableContext
        items={!tasks.length ? ["placeholder"] : tasks.map((task) => task._id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
