import React, { useState } from "react";
import coinLogo from "../assets/coinLogo.png";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
export default function Login() {
  const { login } = useLogin();

  const {
    value: email,
    isValidInput: isEmailValid,
    valueChangeHandler: emailChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: password,
    isValidInput: isPassValid,
    setIsFormSubmitted,
    isFormSubmitted,
    valueChangeHandler: passChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    if (!isFormInvalid) {
      login(email, password);
      navigate("/");
    }
  };
  const isFormInvalid = !isEmailValid || !isPassValid;
  const className = isFormInvalid && isFormSubmitted ? "error" : "input";
  return (
    <>
      <img
        className="absolute translate-x-[-50%] translate-y-[15%] left-[50%] top-[15%] w-18  "
        src={coinLogo}
        alt=""
      />
      <form onSubmit={handleSubmit} className="form-parent">
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="email">
            Email
          </label>
          <input
            className={className}
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
            className={className}
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={passChangeHandler}
          />
        </div>
        
        {isFormInvalid && isFormSubmitted && (
          <p className="text-red-500">Email or password is incorrect!</p>
        )}

        <Link to={"/auth/step1"}>
          <p className=" text-white text-sm font-light underline">
            Don't have an account?
          </p>
        </Link>

        <div className="flex justify-end text-black font-medium">
          <button className="auth-btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
}
