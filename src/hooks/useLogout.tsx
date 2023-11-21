import { useState } from "react";
import { useNavigate } from "react-router";

export default function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const logout = async () => {
    setIsLoading(true);

    localStorage.removeItem("user");
    localStorage.removeItem("company");
    navigate("/auth/login");
    setIsLoading(false);
  };

  return { logout, isLoading };
}
