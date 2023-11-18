import { useEffect, useState } from "react";
import plus from "../assets/Add Button.svg";
import CreateDep from "../components/CreateDep";
import { defer, useLoaderData } from "react-router";
import { Department } from "../shared/types/User";
import edit from "../assets/edit.svg";
import btc from "../assets/bitcoin-(btc).svg";
import { default as deleteIcon } from "../assets/delete.svg";
import { useDep } from "../hooks/useDep";
import UpdateDep from "../components/UpdateDep";
interface DepData {
  depId: string;
  depName: string;
}

export default function Departments() {
  const [showCreate, setShowCreateDep] = useState(false);
  const [showUpdate, setShowUpdateDep] = useState(false);
  const [depData, setDepData] = useState<DepData>({ depId: "", depName: "" });
  var { departments, setDepartments, deleteDepartment } = useDep();
  const { data } = useLoaderData() as any;
  useEffect(() => {
    setDepartments(data.departments);
  }, []);
  return (
    <div className="h-screen">
      <main className="px-8">
        <header className="flex flex-row justify-between items-center font-medium mt-7">
          <span className="text-white text-sm">Departments</span>
          <div
            className="flex flex-row items-center justify-center gap-x-[6px] px-2"
            onClick={() => {
              setShowCreateDep(true);
            }}
          >
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

        {departments.length <= 0 ? (
          <img
            className="h-[40px] w-[40px] absolute translate-x-[50%] right-[50%] top-[50%] cursor-pointer"
            onClick={() => {
              setShowCreateDep(true);
            }}
            src={plus}
            alt="add"
          />
        ) : (
          <ul className="mt-5 flex flex-col gap-y-5">
            {departments.map((dep: Department) => (
              <li
                key={dep._id}
                className="flex flex-row justify-between items-center bg-white h-16 px-4 rounded-md"
              >
                <div className="flex flex-col text-black text-sm font-medium">
                  <span>{dep.departmentName}</span>
                  <div className="flex flex-row gap-x-1 items-center">
                    <img
                      className="w-3 h-3 cursor-pointer"
                      src={btc}
                      alt="btc"
                      onClick={() => {
                        setShowUpdateDep(true);
                      }}
                    />
                    <span className="font-normal text-xs">{dep.totalCoin}</span>
                  </div>
                </div>
                <div className="flex flex-row gap-x-3">
                  <img
                    className="w-[13.78px] h-[15.50px] cursor-pointer"
                    src={edit}
                    alt="edit"
                    onClick={() => {
                      setShowUpdateDep(true);
                      setDepData({ depId: dep._id, depName: dep.departmentName });
                    }}
                  />
                  <img
                    className="w-[13.78px] h-[15.50px] cursor-pointer"
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => {
                      deleteDepartment(dep._id);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        {showCreate && <CreateDep onShow={setShowCreateDep} />}
        {showUpdate && (
          <UpdateDep onShow={setShowUpdateDep} depData={depData} />
        )}
      </main>
    </div>
  );
}

export const depLoader = async () => {
  try {
    const res = await fetch("http://localhost:4000/api/department/get");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    let data: Department[] = await res.json();
    return defer({ data });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
