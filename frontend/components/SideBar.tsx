"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { myTasks } from "./types";
import { useRouter } from "next/navigation";
import AddBoard  from "./AddBoard"


const SideBar = () => {
  const [tasks, settasks] = useState<myTasks[]>([]);

  useEffect(() => {
    axios
      .get<myTasks[]>("http://localhost:5000/api/tasks")
      .then((res) => {
        const tasks = res.data;
        settasks(tasks);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);
  const router = useRouter();

  const handleLinkClick = (name: string, description: string, id:Number) => {
    router.push(`/tasks?name=${name}&description=${description}&id=${id}`);
  };

  return (
    <>
      <div className="flex flex-1">
        <div className="w-72 bg-gray-900">
          <div className="h-16 text-white text-center text-xl m-4 h-auto bg-slate-800 rounded-sm p-1">
            <h2 className="p-2 text-3xl">Boards</h2>
            <ul>
              {tasks.map((task) => (
                <li className="m-3">
                  <button
                    className="m-2 mb-2"
                    onClick={() => handleLinkClick(task.name, task.description, task.id)}
                  >
                    {task.name}
                    
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <AddBoard />
        </div>
        
        
      </div>
    </>
  );
};
export default SideBar;
