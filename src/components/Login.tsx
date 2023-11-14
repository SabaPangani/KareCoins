import coinLogo from "../assets/coinLogo.png";
export default function Login() {
  return (
    <>
    <img className="absolute translate-x-[-50%] translate-y-[15%] left-[50%] top-[15%] w-18  " src={coinLogo} alt="" />
      <form className="form-parent">
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            id="email"
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <p className=" text-white text-sm font-light underline">
          Don't have an account?
        </p>

        <div className="flex justify-end text-black font-medium">
          <button className="auth-btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
}
