import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import "./index.css";
import Card from "./components/UI/card";
import RegisterComp from "./components/RegisterComp";
import RegisterName from "./components/RegisterName";
import RegisterPassword from "./components/RegisterPass";
import Auth from "./pages/Auth";
import { AuthContextProvider } from "./store/AuthContext";
import Root from "./routes/root";
import Departments from "./pages/Departments";
import { depLoader } from "./pages/Departments";
import { userLoader } from "./pages/Users";
import { DepContextProvider } from "./store/DepContext";
import { Users } from "./pages/Users";
import { UserContextProvider } from "./store/UserContext";
import MyAccount, { accLoader } from "./pages/MyAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "departments",
        element: <Departments />,
        loader: depLoader,
      },
      {
        path: "users",
        element: <Users />,
        loader: userLoader,
      },
      {
        path: "my-account",
        element: <MyAccount />,
        loader: accLoader,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "step1",
        element: <RegisterName />,
      },
      {
        path: "step2",
        element: <RegisterComp />,
      },
      {
        path: "step3",
        element: <RegisterPassword />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <DepContextProvider>
        <UserContextProvider>
          <Card>
            <RouterProvider router={router} />
          </Card>
        </UserContextProvider>
      </DepContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
