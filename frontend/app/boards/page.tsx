"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BoardWithID, Task } from "../../components/types";
import AddTask from "@/components/Tasks/AddTask";
import EditBoard from "@/components/Board/EditBoard";
import DeleteBoard from "@/components/Board/DeleteBoard";
import Columns from "@/components/Columns/Columns";
const page = () => {
  const [board, setBoard] = useState<BoardWithID>({
    name: "",
    description: "",
    columns: [
      {
        _id: "",
        name: "",
        tasks: [
          {
            _id: "",
            taskName: "",
            taskDescription: "",
            dueDate: "",
          }
        ],
      },
    ],
    _id: "",
  });
  const params = useSearchParams();
  const id = params.get("_id");
  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await axios.get(
          `http://13.233.120.132:5000/api/boards/${id}`
        );
        setBoard(response.data);
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    if (id) {
      fetchBoardDetails();
    }
  }, [id]);
  return (
    <div>
      <div className="flex">
      <div>
        <h1 className="text-[35px] font-bold mt-4 ml-4 mb-2 text-black-400">
          {board.name}
        </h1>
        <p className="text-[25px] font-semibold  ml-4 mb-2 text-gray-500">
          {board.description}
        </p>
        </div>
        <div className="absolute left-[1600px] mt-4 ">
          <EditBoard />
          <DeleteBoard />
        </div>
      </div>
      <div className="ml-4 mb-4">
        <AddTask />
      </div>
      <div>
        <Columns />
        </div>
      
    </div>
  );
};

export default page;
