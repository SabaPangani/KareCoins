import { useContext } from "react";
import { DepContext } from "../store/DepContext";

export const useDep = () => useContext(DepContext);
