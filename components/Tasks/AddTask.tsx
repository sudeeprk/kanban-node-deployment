import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

function AddTask() {
  const [columnName, setcolumnName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const params = useSearchParams();
  const id = params.get("_id");
  const addTask = async () => {
    try {
      const response = await axios.post(
        `http://13.232.229.116:80/api/boards/${id}/tasks`,
        {
          columnName: columnName,
          taskName: newTaskName,
          taskDescription: newTaskDescription,
          dueDate: new Date(),
        }
      );

      setNewTaskName("");
      setNewTaskDescription("");
      window.location.pathname = "/boards";
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-bold p-2 text-lg bg-black text-white border-none shadow-xl"
        >
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>Enter Details for New Task</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-[550px]">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Column Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={columnName}
              onChange={(e) => setcolumnName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Task Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Due Date
            </Label>
            <Input type="date" id="description" className="col-span-3" />
          </div>
          <Button type="button" onClick={addTask}>
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default AddTask;
