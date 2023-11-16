import React from "react";
import coinLogo from "../assets/coinLogo.png";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
export default function RegisterName() {
  const { handleStep1 } = useAuth();
  const navigate = useNavigate();

  const {
    value: name,
    isValidInput: isNameValid,
    setIsFormSubmitted,
    isFormSubmitted,
    valueChangeHandler: nameChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: phoneNumber,
    isValidInput: isPhoneValid,
    valueChangeHandler: phoneChangeHandler,
  } = useInput((value: string) => /^\d{9}$/.test(value));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (!isFormInvalid) {
      handleStep1(name, parseInt(phoneNumber));
      navigate("/auth/step2");
    }
  };
  const isFormInvalid = !isNameValid || !isPhoneValid
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
          <label className="ml-1 mb-1" htmlFor="name">
            Name
          </label>
          <input
            className={className}
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={nameChangeHandler}
          />
        </div>
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="phone">
            Phone number
          </label>
          <input
            className={className}
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={phoneChangeHandler}
          />
        </div>

        {isFormInvalid && isFormSubmitted && (
          <p className="text-red-500">Email or password is incorrect!</p>
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
