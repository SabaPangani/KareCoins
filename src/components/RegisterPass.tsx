import coinLogo from "../assets/coinLogo.png";
export default function RegisterPassword() {
  return (
    <>
      <img
        className="absolute translate-x-[-50%] translate-y-[15%] left-[50%] top-[15%] w-18  "
        src={coinLogo}
        alt=""
      />
      <form className="form-parent">
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            id="password"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            className="input"
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />
        </div>

        <p className=" text-white text-sm font-light underline">
          Already have an account?
        </p>

        <div className="flex justify-end text-black font-medium">
          <button className="auth-btn" type="submit">
            Register
          </button>
        </div>
      </form>
    </>
  );
}
