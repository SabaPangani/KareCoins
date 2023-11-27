import { useDep } from "../../hooks/useDep";
import { useUser } from "../../hooks/useUser";
interface UserData {
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  jobTitle: string;
}
interface DepData {
  depId: string;
  depName: string;
}
interface Props {
  onShowDelete: (state: boolean) => void;
  userData: UserData;
  depData: DepData;
  action: string;
}
export default function ConfirmDelete({
  onShowDelete,
  depData,
  userData,
  action,
}: Props) {
  const { deleteDepartment } = useDep();
  const { deleteUser } = useUser();

  return (
    <>
      {action === "department" ? (
        <div className="w-[101%] bg-white flex flex-col gap-y-5 p-10 rounded-tl-[50px] rounded-tr-[50px] absolute -bottom-40 left-[50%] right-[50%] translate-x-[-50.05%] z-10">
          <p className="text-center">
            Are you sure you want to delete the{" "}
            <span className="font-bold">"{depData.depName}"</span> department?
          </p>
          <div className="flex flex-row justify-center items-center gap-x-3 font-semibold mt-2">
            <button
              type="button"
              className="w-[113px] h-[50px] left-0 top-0 rounded-[5px] border-2 border-black"
              onClick={() => {
                onShowDelete(false);
              }}
            >
              Cancel
            </button>
            <button
              className="w-[113px] h-[50px] bg-[#FF4949] rounded-[5px] text-white"
              type="submit"
              onClick={() => {
                deleteDepartment(depData.depId);
                onShowDelete(false);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[101%] bg-white flex flex-col gap-y-5 p-10 rounded-tl-[50px] rounded-tr-[50px] absolute -bottom-40 left-[50%] right-[50%] translate-x-[-50.05%] z-10">
          <p className="text-center">
            Are you sure you want to delete the user{" "}
            <span className="font-bold">"{userData.userName}"</span>?
          </p>
          <div className="flex flex-row justify-center items-center gap-x-3 font-semibold mt-2">
            <button
              type="button"
              className="w-[113px] h-[50px] left-0 top-0 rounded-[5px] border-2 border-black"
              onClick={() => {
                onShowDelete(false);
              }}
            >
              Cancel
            </button>
            <button
              className="w-[113px] h-[50px] bg-[#FF4949] rounded-[5px] text-white"
              type="submit"
              onClick={() => {
                deleteUser(userData.userId);
                onShowDelete(false);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </>
  );
}
