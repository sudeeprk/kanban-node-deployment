"use client";
import EditBoard from "@/components/EditBoard";
import DeleteBoard from "@/components/DeleteBoard";
import { useSearchParams } from "next/navigation";

const page: React.FC = () => {
  const searchparams = useSearchParams();
  const id = searchparams.get("id");
  const name = searchparams.get("name");
  const description = searchparams.get("description");
  const handleDelete = () => {};
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
          {/* <Link href={"/editboard"} className='m-4 w-20 text-xl'>Edit</Link> */}
          <EditBoard />
        </div>
        <div>
          <DeleteBoard />
        </div>
      </div>
    </>
  );
};

export default page;
