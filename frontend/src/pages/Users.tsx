import { defer, useLoaderData } from "react-router";
import profileAdd from "../assets/profile-add.svg";
import editUser from "../assets/editUser.svg";
import removeUser from "../assets/removeUser.svg";
import btc from "../assets/bitcoin-(btc).svg";
import sendMoney from "../assets/money-send.svg";
import { User } from "../shared/types/User";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import CreateUser from "../components/CreateUser";
import UpdateUser from "../components/UpdateUser";
import ConfirmDelete from "../components/UI/ConfirmDelete";
import { useDep } from "../hooks/useDep";
interface UserData {
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  jobTitle: string;
}
export const Users = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    userId: "",
    userName: "",
    userEmail: "",
    userRole: "",
    jobTitle: "",
  });
  const { users, setUsers } = useUser();
  const { departments } = useDep();
  const { data } = useLoaderData() as any;

  useEffect(() => {
    setUsers(data.users);
  }, []);

  return (
    <div className="h-screen">
      <main className="px-8">
        <header className="flex flex-row justify-between items-center font-medium mt-7">
          <span className="text-white text-sm">Users</span>
          <div
            className="flex flex-row items-center justify-center gap-x-[6px] px-2"
            onClick={() => {
              setShowCreate(true);
            }}
          >
            <button className=" text-xs text-[#FFCA11] font-light cursor-pointer">
              Add
            </button>
            <img
              className="h-[11px] w-[11px] cursor-pointer"
              src={profileAdd}
              alt="add"
            />
          </div>
        </header>

        {users.length <= 0 ? (
          <img
            className="h-[40px] w-[40px] absolute translate-x-[50%] right-[50%] top-[50%] cursor-pointer"
            src={profileAdd}
            alt="add"
            onClick={() => {
              setShowCreate(true);
            }}
          />
        ) : (
          <ul className="mt-5 flex flex-col gap-y-5">
            {users.map((user: User) => (
              <li
                key={user._id}
                className="flex flex-row justify-between items-center bg-white h-16 px-4 rounded-md"
              >
                <div className="flex flex-col text-black text-sm font-medium">
                  <div className="flex flex-row gap-x-1 items-center">
                    <span>{user.name}</span>
                    <span className="text-[#FFCA11]">-</span>
                    <span className="text-xs text-[#484848] font-normal">
                      {
                        departments.find((dep) => dep._id === user.departmentId)
                          ?.departmentName
                      }
                    </span>
                  </div>
                  <div className="flex flex-row gap-x-1 items-center">
                    <img
                      className="w-3 h-3 cursor-pointer"
                      src={btc}
                      alt="btc"
                    />
                    <span className="font-normal text-xs">
                      {user.totalCoin}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row gap-x-3">
                  <img
                    className="w-[13.78px] h-[15.50px] cursor-pointer"
                    src={editUser}
                    alt="edit"
                    onClick={() => {
                      setShowEdit(true);
                      setUserData({
                        userId: user._id,
                        userName: user.name,
                        userEmail: user.email,
                        userRole: user.role,
                        jobTitle: user.jobTitle,
                      });
                    }}
                  />
                  <img
                    className="w-[13.78px] h-[15.50px] cursor-pointer"
                    src={removeUser}
                    alt="delete"
                    onClick={() => {
                      setShowDelete(true);
                      setUserData({
                        userId: user._id,
                        userName: user.name,
                        userEmail: user.email,
                        userRole: user.role,
                        jobTitle: user.jobTitle,
                      });
                    }}
                  />
                  <img
                    className="w-[13.78px] h-[15.50px] cursor-pointer"
                    src={sendMoney}
                    alt="transaction"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      {showCreate && <CreateUser onShowCreate={setShowCreate} />}
      {showEdit && <UpdateUser onShowEdit={setShowEdit} userData={userData} />}
      {showDelete && (
        <ConfirmDelete
          onShowDelete={setShowDelete}
          userData={userData}
          action="user"
          depData={{ depId: "", depName: "" }}
        />
      )}
    </div>
  );
};

export const usersLoader = async () => {
  const item = localStorage.getItem("user");
  if (item) {
    const user = JSON.parse(item);
    try {
      const res = await fetch("http://localhost:4000/api/user/get", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let data: User[] = await res.json();
      console.log(data);
      return defer({ data });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  return null;
};
