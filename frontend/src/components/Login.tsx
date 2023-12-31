import React from "react";
import coinLogo from "../assets/coinLogo.png";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
export default function Login() {
  const { login, error, isLoading } = useLogin();

  const {
    value: email,
    setIsFormSubmitted,
    isValidInput: isEmailValid,
    valueChangeHandler: emailChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: password,
    isValidInput: isPassValid,
    valueChangeHandler: passChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    await login(email, password);
  };
  return (
    <>
      <div className="flex flex-col gap-y-10 justify-center items-center w-full mt-[5.3rem] mb-[30px]">
        <img className="w-18" src={coinLogo} alt="" />
        <h1 className="text-3xl text-white">Log In</h1>
      </div>
      <form onSubmit={handleSubmit} className="form-parent">
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="email">
            Email
          </label>
          <input
            className={error && !isEmailValid ? "error" : "input"}
            id="email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="password">
            Password
          </label>
          <input
            className={error && !isPassValid ? "error" : "input"}
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={passChangeHandler}
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <Link to={"/auth/step1"}>
          <p className=" text-white text-sm font-light underline">
            Don't have an account?
          </p>
        </Link>

        <div className="flex justify-end text-black font-medium">
          <button className="auth-btn" type="submit" disabled={isLoading}>
            Login
          </button>
        </div>
      </form>
    </>
  );
}
