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
import { useState, useEffect } from "react";
import { Board, BoardWithID } from "../types";
import axios from "axios";
import { useSearchParams } from "next/navigation";

function EditBoard(){
  const [board, setBoard] = useState<BoardWithID>({
    name: "",
    description: "",
    columns: [],
    _id: "",
  });

  const [editedBoardName, setEditedBoardName] = useState<string>("");
  const [editedBoardDescription, setEditedBoardDescription] = useState<string>("");
  const params = useSearchParams();
  const id = params.get("_id");

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await axios.get(`http://13.232.229.116:80/api/boards/${id}`);
        setBoard(response.data);
        setEditedBoardName(response.data.name);
        setEditedBoardDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    fetchBoardDetails();
  }, [id]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBoardName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBoardDescription(e.target.value);
  };

  const editBoard = () => {
    // Basic validation to ensure that name and description are not empty
    if (!editedBoardName || !editedBoardDescription) {
      alert("Please fill out both name and description.");
      return;
    }

    const updatedBoard: Board = {
      ...board,
      name: editedBoardName,
      description: editedBoardDescription,
      column: []
    };

    axios
      .put<Board>(`http://13.232.229.116:80/api/boards/${id}`, updatedBoard)
      .then((response) => {
        console.log(response.data);
        window.location.pathname = "/";
      })
      .catch((error) => console.error("Error editing board:", error));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-bold p-2 w-[70px] text-lg bg-black text-white border-none shadow-xl m-4"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
          <DialogDescription>
            Modify Details for Board
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="editedBoardName" className="text-right">
              Name
            </Label>
            <Input
              id="editedBoardName"
              className="col-span-3"
              value={editedBoardName}
              onChange={handleNameChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="editedBoardDescription" className="text-right">
              Description
            </Label>
            <Input
              id="editedBoardDescription"
              className="col-span-3"
              value={editedBoardDescription}
              onChange={handleDescriptionChange}
            />
          </div>
          <Button type="button" onClick={editBoard}>
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBoard;
