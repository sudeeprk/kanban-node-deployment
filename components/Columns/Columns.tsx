// Import necessary libraries and components
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { DndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { BoardWithID, Column, Task } from '../types';
import { SortableContext, useSortable } from '@dnd-kit/sortable';

export default function Columns() {
  const [board, setBoard] = useState<BoardWithID | null>(null);
  const params = useSearchParams();
  const boardId = params.get('_id');

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await axios.get(`http://13.233.120.132:5000/api/boards/${boardId}`);
        setBoard(response.data);
      } catch (error) {
        console.error('Error fetching board details:', error);
      }
    };

    if (boardId) {
      fetchBoardDetails();
    }
  }, [boardId]);

  const columnIds = useMemo(() => (board ? board.columns.map((col) => col.name) : []), [board]);

  return (
    <>
      <DndContext>
        <div className='flex flex-row min-w-[500px]'>
          {board?.columns.map((col: Column, index: number) => (
            <ColumnComponent key={col._id} columnName={col.name} tasks={col.tasks} columnIndex={index} />
          ))}
        </div>
      </DndContext>
    </>
  );
}

function ColumnComponent({ columnName, tasks, columnIndex }: { columnName: string; tasks: Task[]; columnIndex: number }) {
  return (
    <div className='min-w-[400px]'>
      <h1 className='text-2xl text-center font-bold'>{columnName}</h1>
      <DndContext>
      <SortableContext items={[columnIndex]}>
        {tasks.map((task: Task, taskIndex: number) => (
          <TaskComponent key={task._id} task={task} columnIndex={columnIndex} taskIndex={taskIndex} />
        ))}
      </SortableContext>
      </DndContext>
    </div>
  );
}

function TaskComponent({ task, columnIndex, taskIndex }: { task: Task; columnIndex: number; taskIndex: number }) {
  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: `${columnIndex}-${taskIndex}`,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex: 1,
  };

  return (
    
    <div ref={setNodeRef} {...attributes} {...listeners} className='shadow-lg bg-slate-300 m-3 rounded-lg p-2 max-w-lg h-max' style={style}>
      <p className='text-center font-bold text-2xl'>{task.taskName}</p>
      <p className='text-left text-lg'>{task.taskDescription}</p>
      <p className='text-left text-sm m-1'>{task.dueDate}</p>
    </div>
    
  );
}
