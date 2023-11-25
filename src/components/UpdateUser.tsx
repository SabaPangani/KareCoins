import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import { Department } from "../shared/types/User";
import Select from "react-select";
import { useUser } from "../hooks/useUser";
import { useDep } from "../hooks/useDep";
interface UserData {
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  jobTitle: string;
}
interface Props {
  onShowEdit: (state: boolean) => void;
  userData: UserData;
}
export default function UpdateUser({ onShowEdit, userData }: Props) {
  const [deps, setDeps] = useState<Department[]>([]);
  const [depName, setDepName] = useState("");
  const { departments } = useDep();
  const { editUser, error } = useUser();
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

  const depChangeHandler = (selectedOption: string | undefined) => {
    console.log(
      selectedOption,
      userName,
      email,
      role,
      jobTitle,
      "selectedOption"
    );
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
    editUser(userData.userId, userName, email, role, jobTitle, depName);
    onShowEdit(false);
  };
  useEffect(() => {
    const item = localStorage.getItem("user");
    if (item) {
      const user = JSON.parse(item);
      const fetchDeps = async () => {
        try {
          const res = await fetch("http://localhost:4000/api/department/get", {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          });
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const deps = await res.json();
          setDeps(deps.departments as Department[]);
        } catch (err) {
          console.error(err);
          throw err;
        }
      };
      fetchDeps();
    }
    console.log(departments);
  }, [departments]);

  return (
    <>
      <div
        className="w-screen h-screen absolute left-0 top-0 z-9 bg-black opacity-40"
        onClick={() => {
          onShowEdit(false);
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
            className={!isNameValid && error ? "error" : "root-input"}
            defaultValue={userData.userName}
            type="text"
            name="name"
            placeholder="Enter employee name"
            onChange={nameChangeHandler}
          />
          {error && !isNameValid && (
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
            className={!isEmailValid && error ? "error" : "root-input"}
            defaultValue={userData.userEmail}
            name="email"
            type="text"
            placeholder="Enter employee email"
            onChange={emailChangeHandler}
          />
          {error && !isEmailValid && (
            <span className="ml-1 my-1 text-red-600 text-xs font-normal">
              Invalid input
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
            className={!isRoleValid && error ? "error" : "root-input"}
            defaultValue={userData.userRole}
            name="role"
            type="text"
            placeholder="Enter employee role"
            onChange={roleChangeHandler}
          />
          {error && !isRoleValid && (
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
            className={!isJobValid && error ? "error" : "root-input"}
            defaultValue={userData.jobTitle}
            name="jobTitle"
            type="text"
            placeholder="Enter employee role"
            onChange={jobTitleChangeHandler}
          />
          {error && !isJobValid && (
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
              onShowEdit(false);
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
