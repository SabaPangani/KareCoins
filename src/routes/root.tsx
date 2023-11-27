import logo from "../assets/Group 2.svg";
import bell from "../assets/notification-bing.svg";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import user from "../assets/user-octagon.svg";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
export default function Root() {
  const { state } = useAuth();
  const navigate = useNavigate();

  // UPDATE USERS PAGE SELF VIEW


  useEffect(() => {
    if (state.user?.name === "") {
      navigate("/auth/login");
    }
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
        <NavLink to="/my-account">
          <img src={user} alt="pfp" />
        </NavLink>
      </header>
      <Outlet />
      <Navbar />
    </>
  );
}
