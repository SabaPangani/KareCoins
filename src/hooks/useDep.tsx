import { useContext } from "react";
import { DepContext } from "../store/depContext";

export const useDep = () => useContext(DepContext);
