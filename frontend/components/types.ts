export type myboards = {
    id: Number;
    name: string;
    description: string;
};

export type Task ={
    id: Id;
    columnId: Id;
    name: string;
    description: string;
    
}
export type Id = Number | string

export type Column ={
    id: Id;
    title: string;
}