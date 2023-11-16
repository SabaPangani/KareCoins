import { useState } from "react";
import coinLogo from "../assets/coinLogo.png";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
export default function RegisterComp() {
  const navigate = useNavigate();
  const { handleStep2 } = useAuth();
  const {
    value: companyName,
    isValidInput: isCompNameValid,
    setIsFormSubmitted,
    isFormSubmitted,
    valueChangeHandler: compNameChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: email,
    isValidInput: isEmailValid,
    valueChangeHandler: emailChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    if (!isFormInvalid) {
      handleStep2(companyName, email);
      navigate("/auth/step3");
    }
  };
  const isFormInvalid = !isCompNameValid || !isEmailValid;
  const className = isFormInvalid && isFormSubmitted ? "error" : "input";
  return (
    <>
      <img
        className="absolute translate-x-[-50%] translate-y-[15%] left-[50%] top-[15%] w-18"
        src={coinLogo}
        alt=""
      />
      <form onSubmit={handleSubmit} className="form-parent">
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="company">
            Company
          </label>
          <input
            className={className}
            id="company"
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={compNameChangeHandler}
          />
        </div>
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="email">
            Email
          </label>
          <input
            className={className}
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>
        {isFormInvalid && isFormSubmitted && (
          <p className="text-red-500">Company or email is incorrect!</p>
        )}
        <Link to={"/auth/login"}>
          <p className="text-white text-sm font-light underline">
            Already have an account?
          </p>
        </Link>

        <div className="flex justify-end text-black font-medium">
          <button className="auth-btn" type="submit">
            Next
          </button>
        </div>
      </form>
    </>
  );
}
