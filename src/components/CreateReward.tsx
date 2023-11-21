import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import Select from "react-select";
import { useUser } from "../hooks/useUser";
import { useDep } from "../hooks/useDep";
import useRequest from "../hooks/useRequest";

interface Props {
  onShowReward: (state: boolean) => void;
}
export default function CreateReward({ onShowReward }: Props) {
  const [depName, setDepName] = useState("");
  const [userName, setUserName] = useState("");
  const { users } = useUser();
  const { departments: deps } = useDep();
  const { sendRequest, error, isLoading } = useRequest();
  const {
    value: coinCount,
    isValidInput: isCoinCountValid,
    valueChangeHandler: coinCountChangeHandler,
  } = useInput((value: string) => value.trim() !== "");
  const {
    value: reason,
    isValidInput: isReasonValid,
    valueChangeHandler: reasonChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  useEffect(() => {
    console.log(users, " Users");
  }, []);

  const depChangeHandler = (selectedOption: string | undefined) => {
    if (selectedOption !== undefined) {
      setDepName(selectedOption);
    }
  };
  const userChangeHandler = (selectedOption: string | undefined) => {
    if (selectedOption !== undefined) {
      setUserName(selectedOption);
    }
  };
  const options = deps.map((dep) => ({
    value: dep._id,
    label: dep.departmentName,
  }));
  const options2 = users.map((user) => {
    if (
      user.departmentId ===
      deps.find((dep) => dep.departmentName === depName)?._id
    ) {
      return {
        value: user._id,
        label: user.name,
      };
    }
    return {
      value: "",
      label: "",
    };
  });
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
      opacity: state.isDisabled ? ".2" : "1",
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

    sendRequest(userName, coinCount, reason);
    onShowReward(false);
  };

  return (
    <>
      <div
        className="w-screen h-screen absolute left-0 top-0 z-9 bg-black opacity-40"
        onClick={() => {
          onShowReward(false);
        }}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="w-[101%] bg-white flex flex-col gap-y-3 p-10 rounded-tl-[50px] rounded-tr-[50px] absolute -bottom-40 left-[50%] right-[50%] translate-x-[-50.05%] z-10"
      >
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

        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1 text-black text-base font-normal">
            Select user
          </label>
          <Select
            options={options2}
            styles={customStyles}
            onChange={(selectedValue) => {
              userChangeHandler(selectedValue?.label);
            }}
            isDisabled={options2.every((option) => option.label === "")}
          ></Select>

          {error && !userName && (
            <span className="ml-1 my-1 text-red-600 text-xs font-normal">
              Invalid input
            </span>
          )}
        </div>
        <div className="flex flex-col text-start">
          <label
            className="ml-1 mb-1 text-black text-base font-normal"
            htmlFor="name"
          >
            Enter coin count
          </label>
          <input
            className={error && !isCoinCountValid ? "error" : "root-input"}
            type="text"
            name="name"
            placeholder="Enter employee name"
            value={coinCount}
            onChange={coinCountChangeHandler}
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
            Enter reason
          </label>
          <textarea
            className={
              error && !isReasonValid
                ? "error"
                : "bg-white rounded-[5px] border-2 border-black placeholder:text-sm; pl-1"
            }
            name="email"
            rows={4}
            placeholder="Enter employee email"
            value={reason}
            onChange={reasonChangeHandler}
          />
          {error && (
            <span className="ml-1 my-1 text-red-600 text-xs font-normal">
              {error}
            </span>
          )}
        </div>
        <div className="flex flex-row justify-center items-center gap-x-3 font-semibold mt-2">
          <button
            type="button"
            className="w-[113px] h-[50px] left-0 top-0 rounded-[5px] border-2 border-black"
            onClick={() => {
              onShowReward(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="w-[113px] h-[50px] bg-yellow-400 rounded-[5px]"
            type="submit"
            disabled={isLoading}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
