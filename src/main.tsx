import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import "./index.css";
import Card from "./components/UI/card";
import RegisterComp from "./components/RegisterComp";
import RegisterName from "./components/ReisterName";
import RegisterPassword from "./components/RegisterPass";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
    children: [
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
    <Card>
      <RouterProvider router={router} />
    </Card>
  </React.StrictMode>
);
