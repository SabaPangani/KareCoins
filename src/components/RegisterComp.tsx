import { useState } from "react";
import coinLogo from "../assets/coinLogo.png";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
export default function RegisterComp() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");

  const { handleStep2 } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleStep2(companyName, email,);
    console.log(companyName, email);
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
          <label className="ml-1 mb-1" htmlFor="company">
            Company
          </label>
          <input
            className="input"
            id="company"
            type="text"
            placeholder="Enter company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <p className="text-white text-sm font-light underline">
          Already have an account?
        </p>

        <div className="flex justify-end text-black font-medium">
          <Link to={"/auth/step3"}>
            <button className="auth-btn" type="submit">
              Next
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}
