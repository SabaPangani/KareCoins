import React, { useEffect, useState } from "react";
import coinLogo from "../assets/coinLogo.png";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function RegisterName() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { handleStep1 } = useAuth();

  const handleValidation = () => {
    const isValid = name.trim() !== "" && /^\d{9}$/.test(phoneNumber);

    setIsFormValid(isValid);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (handleValidation()) {
      handleStep1(name, parseInt(phoneNumber));
    }
  };

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
            className="input"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {isFormSubmitted && !isFormValid && (
          <p className="text-red-500">
            Please enter valid name and phone number
          </p>
        )}

        <p className="text-white text-sm font-light underline">
          Already have an account?
        </p>

        <div className="flex justify-end text-black font-medium">
          {isFormValid ? (
            <Link to={"/auth/step2"}>
              <button className="auth-btn" type="submit">
                Next
              </button>
            </Link>
          ) : (
            <button className="auth-btn" type="submit">
              Next
            </button>
          )}
        </div>
      </form>
    </>
  );
}
