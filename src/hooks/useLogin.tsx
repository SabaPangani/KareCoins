import { useState } from "react";
import { useNavigate } from "react-router";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/user/login", {
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
        JSON.stringify({ id: json.userId, token: json.token })
      );
      localStorage.setItem("company", JSON.stringify(json.companyId));
      setIsLoading(false);
      navigate("/departments");
    } catch (err) {
      setIsLoading(false);
      setError("An error occurred. Please try again.");
    }
  };
  return { login, isLoading, error };
}
