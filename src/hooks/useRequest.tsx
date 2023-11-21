import { useState } from "react";
import { useUser } from "./useUser";

export default function useRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { users } = useUser();
  const sendRequest = async (
    receiverName: string,
    coinCount: string,
    reason: string
  ) => {
    const user = localStorage.getItem("user");
    if (user) {
      let userPed = JSON.parse(user);
      var userId = userPed.id;
    }
    const receiverId = users.find((user) => user.name === receiverName)?._id;
    try {
      const res = await fetch("http://localhost:4000/api/request/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: userId,
          receiverId,
          coinCount,
          reason,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setError(json.message);
        console.error(json.message);
        return;
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError("An error occurred. Please try again.");
    }
  };
  return { sendRequest, isLoading, error };
}
