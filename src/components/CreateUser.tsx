import { useDep } from "../hooks/useDep";
import useInput from "../hooks/useInput";

interface Props {
  onShowCreate: (state: boolean) => void;
}
export default function CreateUser({ onShowCreate }: Props) {
  const {
    value: userName,
    isValidInput: isDepNameValid,
    setIsFormSubmitted,
    isFormSubmitted,
    valueChangeHandler: depNameChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const { createDepartment } = useDep();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (isDepNameValid) {
      createDepartment(userName);
      onShowCreate(false);
    }
  };
  const className = !isDepNameValid && isFormSubmitted ? "error" : "root-input";

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
            htmlFor="department"
          >
            Enter user name
          </label>
          <input
            className={className}
            type="text"
            placeholder="Enter employee name"
            value={userName}
          />
          {isFormSubmitted && !isDepNameValid && (
            <span className="ml-1 my-1 text-red-600 text-xs font-normal">
              Invalid input
            </span>
          )}
        </div>
        <div className="flex flex-col text-start">
          <label
            className="ml-1 mb-1 text-black text-base font-normal"
            htmlFor="department"
          >
            Enter  user email
          </label>
          <input
            className={className}
            type="text"
            placeholder="Enter employee email"
          />
          {isFormSubmitted && !isDepNameValid && (
            <span className="ml-1 my-1 text-red-600 text-xs font-normal">
              Invalid input
            </span>
          )}
        </div>
        <div className="flex flex-col text-start">
          <label
            className="ml-1 mb-1 text-black text-base font-normal"
            htmlFor="department"
          >
            Enter  user role
          </label>
          <input
            className={className}
            type="text"
            placeholder="Enter employee role"
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
