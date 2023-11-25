import AddBtn from "../assets/tick.svg";
import DltBtn from "../assets/rejectBtn.svg";
import Btc from "../assets/btc.svg";
import Activestatus from "../assets/activeBtn.svg";
import { useState } from "react";

const Notifications = () => {
  const [isExpanded, setisExpanded] = useState(false);
  const [first, setfirst] = useState(console.log("hello"));

  const handleExpand = () => {
    setisExpanded((cur) => !cur);
  };

  const handlelog = () => {
    console.log("click");
  };
  const dataUser = {
    event1: {
      name: "Mubasheer",
      reason: "Celebrating a special milestone",
      date: "24/07/2023",
      time: "18:30",
    },
    event2: {
      name: "Mubasheeraoui",
      reason:
        "stayed late one night to help a customer with a problem. He was patient and understanding, and he went above and beyond to make sure that the customer was satisfied.John's commitment to customer service is an asset to our company.",
      date: "01/07/2023",
      time: "09:00",
    },
  };
  return (
    <div className="h-screen px-8 flex flex-col items-center">
      <h1 className="text-white font-medium my-10">Notifications</h1>

      <div className="flex flex-col gap-y-3 bg-white px-6 md:w-1/2	 py-[26px] text-[#484848] rounded-[10px]">
        {/* User1 */}
        <div className="User1 flex flex-row  border-b-2 pb-2 border-gray-600 gap-2">
          {/* <img src={Activestatus} alt="" /> */}
          <img
            className="rounded-full border-2 h-12"
            src="https://i.pravatar.cc/48?u=118836"
            alt=""
          />
          <div
            onClick={handleExpand}
            className="text_container justify-between flex items-center	gap-2  w-full text-xs"
          >
            <div className="cursor-pointer	">
              <p className="font-medium text-sm">
                {dataUser.event1.name}{" "}
                <span className="text-yellow-300"> To </span>{" "}
                {dataUser.event2.name}
              </p>
              <p className={isExpanded ? "" : "line-clamp-1"}>
                <span className="text-gray-600 font-semibold ">Reason: </span>
                Consistently goes above and beyond her job duties to help her
                team succeed. She is always willing to take on extra work and is
                always looking for ways to improve her skills. Sarah's
                dedication to her work is an inspiration to her team and her
                company.
              </p>
            </div>
            <div className="right flex-row h-full">
              <p>
                {dataUser.event1.date} {dataUser.event1.time}{" "}
                <span className="text-yellow-300">AM</span>
              </p>
              <div className="flex gap-2 justify-end	">
                <img className="" src={Btc} alt="" />
                <p className="">100</p>
              </div>
              {isExpanded && (
                <div className="flex gap-2 justify-end">
                  <img onClick={handlelog} src={AddBtn} alt="" />
                  <img src={DltBtn} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User2 */}

        <div className="User2 flex flex-row  border-b-2 pb-2 border-gray-600 gap-2 ">
          {/* <img src={Activestatus} alt="" /> */}
          <img
            className="rounded-full border-2 h-12"
            src="https://i.pravatar.cc/49?u=118829"
            alt=""
          />
          <div className="text-continer justify-between	flex items-center	gap-2 w-full text-xs">
            <div className="cursor-pointer">
              <p className="font-medium text-sm	">
                {dataUser.event1.name}{" "}
                <span className="text-yellow-300"> To </span>{" "}
                {dataUser.event2.name}
              </p>
              <p className={isExpanded ? "" : "line-clamp-1"}>
                <span className="text-gray-600 font-semibold truncate">
                  Reason:{" "}
                </span>
                {dataUser.event2.reason}
              </p>
            </div>
            <div className="right">
              <p>
                {dataUser.event1.date} {dataUser.event1.time}{" "}
                <span className="text-yellow-300">AM</span>
              </p>
              <div className="flex gap-2 justify-end	">
                <img className="" src={Btc} alt="" />
                <p className="">100</p>
              </div>
            </div>
          </div>
        </div>

        <div className="User2 flex flex-row  border-b-2 pb-2 border-gray-600 gap-2 ">
          <img
            className="rounded-full border-2 h-12"
            src="https://i.pravatar.cc/49?u=118829"
            alt=""
          />
          <div className="text-continer justify-between	flex items-center	gap-2 w-full text-xs">
            <div className="cursor-pointer">
              <p className="font-medium text-sm	">
                {dataUser.event1.name}{" "}
                <span className="text-yellow-300"> To </span>{" "}
                {dataUser.event2.name}
              </p>
              <p className="text-ellipsis	">
                <span className="text-gray-600 font-semibold truncate">
                  Reason:{" "}
                </span>
                {dataUser.event1.reason}
              </p>
            </div>
            <div className="right">
              <p>
                {dataUser.event1.date} {dataUser.event1.time}{" "}
                <span className="text-yellow-300">AM</span>
              </p>
              <div className="flex gap-2 justify-end	">
                <img className="" src={Btc} alt="" />
                <p className="">100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
