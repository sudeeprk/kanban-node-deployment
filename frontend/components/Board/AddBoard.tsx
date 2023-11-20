import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Board } from "../types";
import axios from "axios";
import { useRouter } from "next/navigation";

function AddBoard() {
  const [newBoardName, setNewBoardName] = useState<string>("");
  const [newBoardDescription, setNewBoardDescription] = useState<string>("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardDescription(e.target.value);
  };

  const router = useRouter();
  const addBoard = () => {
    // Basic validation to ensure that name and description are not empty
    if (!newBoardName || !newBoardDescription) {
      alert("Please fill out both name and description.");
      return;
    }

    const newBoard: Board = {
      name: newBoardName,
      description: newBoardDescription,
      column: [],
      _id: "",
    };

    axios
      .post<Board>(`${process.env.NEXT_PUBLIC_API_URL}/boards`, newBoard)
      .then((response) => {
        console.log(response.data);
        // Reset input fields
        setNewBoardName("");
        setNewBoardDescription("");
        // router.replace("/");
        window.location.pathname = "/";
      })
      .catch((error) => console.error("Error adding board:", error));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-bold p-2 text-lg bg-black text-white border-none shadow-xl"
        >
          Add Board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Board</DialogTitle>
          <DialogDescription>
            Enter Details for New Board
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={newBoardName}
              onChange={handleNameChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={newBoardDescription}
              onChange={handleDescriptionChange}
            />
          </div>
          <Button type="button" onClick={addBoard}>
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default AddBoard