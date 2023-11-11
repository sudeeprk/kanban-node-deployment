// DeleteBoard.tsx

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useSearchParams } from "next/navigation";

function DeleteBoard(){
  const params = useSearchParams();
  const id = params.get("_id");

  const deleteBoard = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/boards/${id}`);
      // Redirect to the boards page after successfully deleting a board
      window.location.pathname = "/";
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-bold p-2 text-lg bg-black text-white border-none shadow-xl"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Board</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this board?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button type="button" onClick={deleteBoard} className="hover:bg-red-700">
            Confirm Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBoard;
