import plus from "../assets/plus.png";

export default function Home() {
  return (
    <div className="h-screen">
      <main className="px-8">
        <header className="flex flex-row justify-between items-center font-medium mt-7">
          <span className="text-white text-sm">Departments</span>
          <div className="flex flex-row items-center justify-center gap-x-[6px] px-2">
            <button className=" text-xs text-[#FFCA11] font-light">Add</button>
            <img className="h-[11px] w-[11px]" src={plus} alt="add" />
          </div>
        </header>

        <img
          className="h-[40px] w-[40px] absolute  right-[50%] top-[50%]"
          src={plus}
          alt="add"
        />
      </main>
    </div>
  );
}
