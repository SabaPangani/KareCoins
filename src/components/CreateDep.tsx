import { useDep } from "../hooks/useDep";
import useInput from "../hooks/useInput";

interface Props {
  onShow: (state: boolean) => void;
}
export default function CreateDep({ onShow }: Props) {
  const {
    value: depName,
    isValidInput: isDepNameValid,
    valueChangeHandler: depNameChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const { createDepartment, error } = useDep();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createDepartment(depName);
    onShow(false);
  };

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
            className={!isDepNameValid && error ? "error" : "root-input"}
            id="department"
            type="text"
            placeholder="Enter department name"
            value={depName}
            onChange={depNameChangeHandler}
          />
          {error && (
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
            Add
          </button>
        </div>
      </form>
    </>
  );
}
