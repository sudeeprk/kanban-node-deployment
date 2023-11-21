export type Task = {
    _id: string;
    taskName: string;
    taskDescription: string;
    dueDate: string;
    }

export type Column = {
    _id: string;
    name: string;
    tasks: Task[];
}  
  
export type BoardWithID = {
    name: string;
    description: string;
    columns : Column[];
    _id: string;
  }
export type Board = {
    name: string;
    description: string;
    column : Column[];
    _id: string;
  }  