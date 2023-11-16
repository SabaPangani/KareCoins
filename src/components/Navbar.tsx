import moneySend from "../assets/moneySend.png"
import dep from "../assets/dep.png"
import users from "../assets/users.png"
export default function () {
  return (
    <nav className="w-[316px] bg-white">
      <div className="w-[110%] h-36 right-[50%] translate-x-[50%] bg-white flex flex-row gap-x-20 justify-center items-center rounded-[48%] absolute bottom-[-2.60rem] py-4 px-8">
        <img className="h-[26px] w-[26px] mb-14" src={dep} alt="" />
        <img className="h-10 w-10 mb-16" src={moneySend} alt="" />
        <img className="h-[26px] w-[26px] mb-14" src={users} alt="" />
      </div>
    </nav>
  );
}