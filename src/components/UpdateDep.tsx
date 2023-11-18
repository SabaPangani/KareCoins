import { useState } from "react";
import { useDep } from "../hooks/useDep";
import useInput from "../hooks/useInput";

interface DepData {
  depId: string;
  depName: string;
}

interface Props {
  onShow: (state: boolean) => void;
  depData: DepData;
}
export default function UpdateDep({ onShow, depData }: Props) {
  const {
    value: departmentName,
    isValidInput: isDepNameValid,
    setIsFormSubmitted,
    isFormSubmitted,
    valueChangeHandler: depNameChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const { updateDepartment } = useDep();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (isDepNameValid && depData.depName !== departmentName) {
      updateDepartment(depData.depId, departmentName);
      onShow(false);
    }
  };

  const className =
    (!isDepNameValid && isFormSubmitted) || depData.depName === departmentName
      ? "error"
      : "root-input";

  return (
    <>
      <div
        className="w-screen h-screen absolute left-0 top-0 z-9 bg-black opacity-40"
        onClick={() => {
          onShow(false);
        }}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="w-[101%] bg-white flex flex-col gap-y-5 p-10 rounded-tl-[50px] rounded-tr-[50px] absolute -bottom-40 left-[50%] right-[50%] translate-x-[-50.05%] z-10"
      >
        <div className="flex flex-col text-start">
          <label
            className="ml-1 mb-1 text-black text-base font-normal"
            htmlFor="department"
          >
            Enter department name
          </label>
          <input
            className={className}
            id="department"
            defaultValue={depData.depName}
            type="text"
            placeholder="Enter department name"
            onChange={depNameChangeHandler}
          />
          {isFormSubmitted && !isDepNameValid && (
            <span className="ml-1 my-1 text-red-600 text-xs font-normal">
              Invalid input
            </span>
          )}
        </div>
        <div className="flex flex-row justify-center items-center gap-x-3 font-semibold">
          <button
            type="button"
            className="w-[113px] h-[50px] left-0 top-0 rounded-[5px] border-2 border-black"
            onClick={() => {
              onShow(false);
            }}
          >
            Cancel
          </button>
          <button
            className="w-[113px] h-[50px] bg-yellow-400 rounded-[5px]"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}
