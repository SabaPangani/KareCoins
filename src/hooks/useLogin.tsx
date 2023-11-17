import { useState } from "react";

export default function useLogin() {
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

      localStorage.setItem(
        "user",
        JSON.stringify({ email: json.email, token: json.token })
      );
      localStorage.setItem("company", JSON.stringify(json.companyId));
    } catch (err) {
      setIsLoading(false);
      setError("An error occurred. Please try again.");
    }
  };
  return { login, isLoading, error };
}
