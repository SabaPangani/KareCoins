import { useState } from "react";
import { useAuth } from "./useAuth";

export default function useLogin() {
  const { dispatch } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const json = await res.json();
        setIsLoading(false);
        setError(json.message);
        console.error(json.message);
        return;
      }

      const json = await res.json();

      dispatch({ type: "LOGIN", payload: json });
      localStorage.setItem("token", JSON.stringify(json.token));
    } catch (err) {
      setIsLoading(false);
      setError("An error occurred. Please try again.");
    }
  };
  return { login, isLoading, error };
}
