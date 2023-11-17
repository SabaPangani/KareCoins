import { useState } from "react";
import { User } from "../shared/types/User";
// import { useAuth } from "./useAuth";

export default function useSignup() {
  // const { dispatch } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const signup = async (user: User) => {
    setIsLoading(true);
    console.log(user);
    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const json = await res.json();
        setIsLoading(false);
        setError(json.message);
        console.error(json.message);
        return;
      }

    } catch (err) {
      setIsLoading(false);
      setError("An error occurred. Please try again.");
      console.error(err, "error");
    }
  };
  return { signup, isLoading, error };
}
