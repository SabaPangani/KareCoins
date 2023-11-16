import React, { useState } from "react";
import coinLogo from "../assets/coinLogo.png";
import { useAuth } from "../hooks/useAuth";
import useSignup from "../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
export default function RegisterPassword() {
  const { signup } = useSignup();
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    value: password,
    isValidInput: isPasswordValid,
    setIsFormSubmitted,
    isFormSubmitted,
    valueChangeHandler: passChangeHandler,
  } = useInput((value: string) => value.trim() !== "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    if (!isFormInvalid) {
      await signup({ ...user, password });
      navigate("/auth/login");
    }
  };
  const isFormInvalid = !isPasswordValid;
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
          <label className="ml-1 mb-1" htmlFor="password">
            Password
          </label>
          <input
            className={className}
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={passChangeHandler}
          />
        </div>
        <div className="flex flex-col text-start">
          <label className="ml-1 mb-1" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            className={className}
            id="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={passChangeHandler}
          />
        </div>
        {isFormInvalid && isFormSubmitted && (
          <p className="text-red-500">Passwords do not match!</p>
        )}
        <Link to={"/auth/login"}>
          <p className="text-white text-sm font-light underline">
            Already have an account?
          </p>
        </Link>

        <div className="flex justify-end text-black font-medium">
          <button className="auth-btn" type="submit">
            Register
          </button>
        </div>
      </form>
    </>
  );
}
