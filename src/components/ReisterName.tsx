import coinLogo from "../assets/coinLogo.png";
export default function RegisterName() {
  return (
    <>
      <img
        className="absolute translate-x-[-50%] translate-y-[15%] left-[50%] top-[15%] w-18  "
        src={coinLogo}
        alt=""
      />
      <form className="form-parent">
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            id="name"
            type="text"
            placeholder="Enter your name"
          />
        </div>
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="phone">
            Phone number
          </label>
          <input
            className="input"
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
          />
        </div>

        <p className=" text-white text-sm font-light underline">
          Already have an account?
        </p>

        <div className="flex justify-end text-black font-medium">
          <button className="auth-btn" type="submit">
            Next
          </button>
        </div>
      </form>
    </>
  );
}
