import useInput from "../hooks/useInput";

interface Props {
  onShow: (state: boolean) => void;
}
export default function CreateDep({ onShow }: Props) {
  const {
    value: depName,
    isValidInput: isDepNameValid,
    setIsFormSubmitted,
    isFormSubmitted,
    valueChangeHandler: depNameChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    const compId = localStorage.getItem("company");
    if (compId) {
      var pedCompId = JSON.parse(compId);
    }
    if (isDepNameValid) {
      try {
        const res = await fetch(
          "http://localhost:4000/api/department/create-dep",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              departmentName: depName,
              companyId: pedCompId,
            }),
          }
        );

        if (!res.ok) {
          const json = await res.json();
          console.error(json);
          return;
        }
      } catch (err) {
        console.error("Failed to create department ", err);
      }
    }
  };
  const className = !isDepNameValid && isFormSubmitted ? "error" : "root-input";

  return (
    <>
    <div className="w-screen h-screen absolute left-0 top-0 z-9 bg-black opacity-40"></div>
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
            type="text"
            placeholder="Enter department name"
            value={depName}
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
