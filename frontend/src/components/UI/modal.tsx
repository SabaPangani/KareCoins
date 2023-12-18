import fail from "../assets/copy-failed.svg";
import suc from "../assets/copy-success.svg";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const modal = ({ children }: Props) => {
  return (
    <div className="w-[101%] lg:w-[50%] bg-white flex flex-col items-center  gap-y-3 p-10  rounded-tl-[50px] rounded-tr-[50px] absolute -bottom-40 left-[50%] right-[50%] translate-x-[-50.05%] z-10">
      <img className="w-20" src={suc} alt="" />
      {children}
      <p>Success Message Comes here</p>
      <button className="bg-yellow-400 py-3 px-20 rounded">Continue</button>
    </div>
  );
};

export default modal;
