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
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "home",
        element: <Home />,
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
      <Card>
        <RouterProvider router={router} />
      </Card>
    </AuthContextProvider>
  </React.StrictMode>
);
