export type myboards = {
    id: Number;
    name: string;
    description: string;
};

export type Task ={
    id: Number;
    name: string;
    description: string;
    dueDate: Date;
}

export type Column ={
    id: Number;
    title: string;
    description: string;
    tasks: Task[];
}