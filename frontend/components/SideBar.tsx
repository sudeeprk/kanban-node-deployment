"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BoardWithID, Task } from "./types";
import { useRouter } from "next/navigation";
import AddBoard from "./Board/AddBoard"
const SideBar: React.FC = () => {
  const [boards, setBoards] = useState<BoardWithID[]>([]);
  

  useEffect(() => {
    axios
      .get<BoardWithID[]>("http://13.233.120.132:5000/api/boards")
      .then((res) => {
        const boards = res.data;
        setBoards(boards);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  const router = useRouter();

  const handleLinkClick = ( _id: string) => {
    router.push(`/boards?_id=${_id}`);
  };
  
  return (
    <>
      <div className="flex flex-1">
        <div className="w-72 bg-gray-900">
          <div className="h-16 text-white text-center text-xl m-4 h-auto bg-slate-800 rounded-sm p-1">
            <h2 className="p-2 text-3xl">Boards</h2>
            <ul>
              {boards.map((board) => (
                <li className="m-3 ">
                  <button
                    className="m-2 mb-2 hover:text-blue-500"
                    onClick={() => handleLinkClick(board._id)}
                  >
                    {board.name}
                    
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="ml-20">
          <AddBoard />
          </div>
          </div>
        </div>
    </>
  );
};

export default SideBar;
