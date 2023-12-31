import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import { Department } from "../shared/types/User";
import Select from "react-select";
import { useUser } from "../hooks/useUser";
import { useDep } from "../hooks/useDep";

interface Props {
  onShowCreate: (state: boolean) => void;
}
export default function CreateUser({ onShowCreate }: Props) {
  const [depName, setDepName] = useState("");
  const { addUser, error } = useUser();
  const { departments: deps } = useDep();
  const {
    value: userName,
    isValidInput: isNameValid,
    valueChangeHandler: nameChangeHandler,
  } = useInput((value: string) => value.trim() !== "");
  const {
    value: email,
    isValidInput: isEmailValid,
    valueChangeHandler: emailChangeHandler,
  } = useInput((value: string) => value.trim() !== "");
  const {
    value: role,
    isValidInput: isRoleValid,
    valueChangeHandler: roleChangeHandler,
  } = useInput((value: string) => value.trim() !== "");
  const {
    value: jobTitle,
    isValidInput: isJobValid,
    valueChangeHandler: jobTitleChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  useEffect(() => {
    console.log(error, " error");
  }, [error]);
  const depChangeHandler = (selectedOption: string | undefined) => {
    if (selectedOption !== undefined) {
      setDepName(selectedOption);
    }
  };
  const options = deps.map((dep) => ({
    value: dep._id,
    label: dep.departmentName,
  }));
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      background: "#fff",
      border:
        error && !depName ? "2px solid rgb(220 38 38)" : "2px solid black",
      minHeight: "30px",
      height: "50px",
      borderRadius: "5px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided: any) => ({
      ...provided,
      height: "50px",
      padding: "0 6px",
    }),

    input: (provided: any) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: "50px",
    }),
    option: (provided: any) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
    }),
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(userName, email, role, jobTitle, depName);
  };


  return (
    <>
      <div
        className="w-screen h-screen absolute left-0 top-0 z-9 bg-black opacity-40"
        onClick={() => {
          onShowCreate(false);
        }}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="w-[101%] bg-white flex flex-col gap-y-3 p-10 rounded-tl-[50px] rounded-tr-[50px] absolute -bottom-40 left-[50%] right-[50%] translate-x-[-50.05%] z-10"
      >
        <div className="flex flex-col text-start">
          <label
            className="ml-1 mb-1 text-black text-base font-normal"
            htmlFor="name"
          >
            Enter user name
          </label>
          <input
            className={error && !isNameValid ? "error" : "root-input"}
            type="text"
            name="name"
            placeholder="Enter employee name"
            value={userName}
            onChange={nameChangeHandler}
          />
          {error && (
            <span className="ml-1 my-1 text-red-600 text-xs font-normal">
              Invalid input
            </span>
          )}
        </div>
        <div className="flex flex-col text-start">
          <label
            className="ml-1 mb-1 text-black text-base font-normal"
            htmlFor="email"
          >
            Enter user email
          </label>
          <input
            className={error && !isEmailValid ? "error" : "root-input"}
            name="email"
            type="text"
            placeholder="Enter employee email"
            value={email}
            onChange={emailChangeHandler}
          />
          {error && (
            <span className="ml-1 my-1 text-red-600 text-xs font-normal">
              {error}
            </span>
          )}
        </div>
        <div className="flex flex-col text-start">
          <label
            className="ml-1 mb-1 text-black text-base font-normal"
            htmlFor="role"
          >
            Enter user role
          </label>
          <input
            className={error && !isRoleValid ? "error" : "root-input"}
            name="role"
            type="text"
            placeholder="Enter employee role"
            value={role}
            onChange={roleChangeHandler}
          />
          {error && (
            <span className="ml-1 my-1 text-red-600 text-xs font-normal">
              Invalid input
            </span>
          )}
        </div>
        <div className="flex flex-col text-start">
          <label
            className="ml-1 mb-1 text-black text-base font-normal"
            htmlFor="jobTitle"
          >
            Enter job title
          </label>
          <input
            className={error && !isJobValid ? "error" : "root-input"}
            name="jobTitle"
            type="text"
            placeholder="Enter employee role"
            value={jobTitle}
            onChange={jobTitleChangeHandler}
          />
          {error && (
            <span className="ml-1 my-1 text-red-600 text-xs font-normal">
              Invalid input
            </span>
          )}
        </div>
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1 text-black text-base font-normal">
            Select department
          </label>
          <Select
            options={options}
            styles={customStyles}
            onChange={(selectedValue) => {
              depChangeHandler(selectedValue?.label);
            }}
          ></Select>
          {error && !depName && (
            <span className="ml-1 my-1 text-red-600 text-xs font-normal">
              Invalid input
            </span>
          )}
        </div>
        <div className="flex flex-row justify-center items-center gap-x-3 font-semibold mt-2">
          <button
            type="button"
            className="w-[113px] h-[50px] left-0 top-0 rounded-[5px] border-2 border-black"
            onClick={() => {
              onShowCreate(false);
            }}
          >
            Cancel
          </button>
          <button
            className="w-[113px] h-[50px] bg-yellow-400 rounded-[5px]"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
