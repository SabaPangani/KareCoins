import moneySend from "../assets/money-send.svg";
import dep from "../assets/data.svg";
import users from "../assets/user-square.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import CreateReward from "./CreateReward";
export default function () {
  const [showRewardCreate, setShowRewardCreate] = useState(false);
  return (
    <>
      <nav className="w-[316px]">
        <div
          className="w-[110%] h-36 fixed right-1/2 bottom-[-3rem] translate-x-1/2 bg-white flex flex-row gap-x-20 justify-center items-center rounded-[48%]"
          id="nav"
        >
          <NavLink
            to="/departments"
            className={({ isActive }) => [isActive ? "active" : ""].join(" ")}
          >
            <img className="h-[26px] w-[26px] mb-14" src={dep} alt="" />
          </NavLink>
          <img
            className="h-10 w-10 mb-16 z-10"
            src={moneySend}
            alt=""
            onClick={() => setShowRewardCreate(true)}
          />
          <NavLink
            to="/users"
            className={({ isActive }) => [isActive ? "active" : ""].join(" ")}
          >
            <img className="h-[26px] w-[26px] mb-14 z-10" src={users} alt="" />
          </NavLink>
        </div>
      </nav>

      {showRewardCreate && <CreateReward onShowReward={setShowRewardCreate} />}
    </>
  );
}
