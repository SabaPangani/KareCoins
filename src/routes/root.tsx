import logo from "../assets/coinLogo2.png";
import bell from "../assets/bell.png";
import user from "../assets/users.png";
import Navbar from "../components/Navbar";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
export default function Root() {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !state.isAuthenticated ? navigate("/auth/login") : navigate("/home");
  }, [state]);
  return (
    <>
      <header className="flex flex-row justify-between content-center w-full px-8 py-6 rounder-br-[20px] rounded-bl-[20px] bg-white">
        <img
          src={logo}
          alt="logo"
          className="absolute -left-[-50%] translate-x-[-50%] top-8"
        />

        <img src={bell} alt="notification" />
        <img src={user} alt="pfp" />
      </header>
      <Outlet />
      <Navbar />
    </>
  );
}
