import logo from "../assets/Group 2.svg";
import bell from "../assets/notification-bing.svg";
import user from "../assets/user-octagon.svg";
import Navbar from "../components/Navbar";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
export default function Root() {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !state.user ? navigate("/auth/login") : navigate("/departments");
  }, [state.user]);
  return (
    <>
      <header className="flex flex-row justify-between content-center w-full px-8 py-6 rounder-br-[20px] rounded-bl-[20px] bg-white">
        <img
          src={logo}
          alt="logo"
          className="absolute -left-[-50%] translate-x-[-50%] top-7 bg-white rounded-full p-2"
        />

        <img src={bell} alt="notification" />
        <img src={user} alt="pfp" />
      </header>
      <Outlet />
      <Navbar />
    </>
  );
}
