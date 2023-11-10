import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'
import { useSearchParams } from "next/navigation";
export function DeleteBoard() {
    
    const searchparams = useSearchParams();
    const id = searchparams.get("id");
    const handleDelete = async () => {
        
        try {
            await axios.delete(`http://localhost:5000/api/deleteboard/${id}`);
            window.location.replace('/boards');
        } catch (error) {
            console.error('Error deleting board:', error);
        }
    };



    return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-2 ml-3 bg-black text-white font-bold h-11 w-20 hover:bg-red-700">Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Do you want to delete this board?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={handleDelete}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBoard;