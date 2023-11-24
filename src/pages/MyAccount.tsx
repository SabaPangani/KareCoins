import { defer, useLoaderData } from "react-router";
import useLogout from "../hooks/useLogout";
import { User } from "../shared/types/User";
import { useEffect } from "react";
export default function MyAccount() {
  const { logout } = useLogout();
  const { user } = useLoaderData() as any;
  useEffect(() => {
    console.log(user, " data");
  });

  return (
    <div className="h-screen px-8 flex flex-col">
      <h1 className="text-white font-medium my-10">My account</h1>

      <div className="flex flex-col gap-y-3 bg-white px-6 py-[26px] text-[#484848] rounded-[10px]">
        <header className="flex flex-row">
          <h3 className="font-medium">Mykare Health</h3>
          <img src="" alt="" />
        </header>
        <span>{user.user.email}</span>
        <span>{user.user.contactNumber}</span>
        <div className="flex flex-col gap-y-1 "></div>
        <button
          className="w-[113px] h-[50px] bg-[#FF4D4D] rounded-[5px] text-white"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export const userLoader = async () => {
  const user = localStorage.getItem("user");
  if (user) {
    let userPed = JSON.parse(user);
    let userId = userPed.id;

    try {
      const res = await fetch(`http://localhost:4000/api/user/getUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userPed?.token}`,
        },
        body: JSON.stringify({
          userId,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let user: User = await res.json();
      return defer({ user });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  return null;
};
