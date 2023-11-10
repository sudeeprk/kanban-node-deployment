import React from 'react'
import {Task} from "./types"
const TaskComponent: React.FC<{ task: Task }> = ({ task }) => {
    return (
      <div className="bg-slate-500 border-2 p-2 mb-2">
        <h3>{task.name}</h3>
        <p>{task.description}</p>
        <p>Due Date: {task.dueDate.toString()}</p>
      </div>
    );
  };

export default TaskComponent