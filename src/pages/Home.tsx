import { useState } from "react";
import plus from "../assets/Add Button.svg";
import CreateDep from "../components/CreateDep";

export default function Home() {
  const [show, setShow] = useState(false);
  return (
    <div className="h-screen">
      <main className="px-8">
        <header className="flex flex-row justify-between items-center font-medium mt-7">
          <span className="text-white text-sm">Departments</span>
          <div className="flex flex-row items-center justify-center gap-x-[6px] px-2">
            <button className=" text-xs text-[#FFCA11] font-light cursor-pointer">
              Add
            </button>
            <img
              className="h-[11px] w-[11px] cursor-pointer"
              src={plus}
              alt="add"
            />
          </div>
        </header>

        <img
          className="h-[40px] w-[40px] absolute translate-x-[50%] right-[50%] top-[50%] cursor-pointer"
          onClick={() => {
            setShow((prev) => !prev);
          }}
          src={plus}
          alt="add"
        />

        {show && <CreateDep onShow={setShow} />}
      </main>
    </div>
  );
}
