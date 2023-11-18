import { useContext } from "react";
import { UserContext } from "../store/UserContext";

export const useUser = () => useContext(UserContext);
