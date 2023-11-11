export type Task = {
    taskName: string;
    taskDescription: string;
    dueDate: string;
  }
  
export type BoardWithID = {
    name: string;
    description: string;
    tasks: Task[];
    _id: string;
  }
export type Board = {
    name: string;
    description: string;
    tasks: Task[];
  }  