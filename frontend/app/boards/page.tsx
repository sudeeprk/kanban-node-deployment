"use client";
import EditBoard from "@/components/EditBoard";
import DeleteBoard from "@/components/DeleteBoard";
import { useSearchParams } from "next/navigation";
import { AddTask } from "../../components/AddTask";
import { useEffect, useState } from "react";
import axios from "axios";

const page: React.FC = () => {
  const searchparams = useSearchParams();
  const id = searchparams.get("id");
  const name = searchparams.get("name");
  const description = searchparams.get("description");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);



  return (
    <>
      <div className="flex w-auto max-w-md">
        <div className="">
          <h1 className="m-4 text-5xl">{name}</h1>
          <h2 className="m-4 text-3xl">{description}</h2>
        </div>
      </div>
      <div className="flex flex-row justify-end max-w-full relative bottom-32 right-20">
        <div className="flex flex-row">
          <EditBoard />
        </div>
        <div>
          <DeleteBoard />
        </div>
      </div>
      <div className="relative bottom-10 ">
        <AddTask />
      </div>
    </>
  );
};

export default page;
