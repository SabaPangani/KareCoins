import coinLogo from "../assets/coinLogo.png";
export default function RegisterComp() {
  return (
    <>
      <img
        className="absolute translate-x-[-50%] translate-y-[15%] left-[50%] top-[15%] w-18  "
        src={coinLogo}
        alt=""
      />
      <form className="form-parent">
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="company">
            Company
          </label>
          <input
            className="input"
            id="company"
            type="text"
            placeholder="Enter company name"
          />
        </div>
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            id="email"
            type="email"
            placeholder="Enter your email"
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
