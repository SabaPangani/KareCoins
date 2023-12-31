import { useState } from "react";
import { User } from "../shared/types/User";
import { useNavigate } from "react-router";
// import { useAuth } from "./useAuth";

export default function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signup = async (user: User) => {
    setIsLoading(true);
    console.log(user);
    try {
      const res = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const json = await res.json();
      
      if (!res.ok) {
        setIsLoading(false);
        setError(json.message);
        console.error(json.message);
        return;
      }

      setIsLoading(false);
      navigate("/auth/login");
    } catch (err) {
      setIsLoading(false);
      setError("An error occurred. Please try again.");
      console.error(err, "error");
    }
  };
  return { signup, isLoading, error };
}
