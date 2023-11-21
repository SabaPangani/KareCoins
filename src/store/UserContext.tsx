import { createContext, ReactNode, useState } from "react";
import { User } from "../shared/types/User";

interface UserContext {
  users: User[];
  error: string;
  setUsers: (users: User[]) => void;
  addUser: (
    name: string,
    email: string,
    role: string,
    jobTitle: string,
    departmentName: string
  ) => void;
  editUser: (
    userId: string,
    name: string,
    email: string,
    role: string,
    jobTitle: string,
    departmentName: string
  ) => void;
  deleteUser: (userId: string) => void;
}

export const UserContext = createContext<UserContext>({
  users: [],
  error: "",
  setUsers: () => {},
  addUser: async () => {},
  editUser: async () => {},
  deleteUser: async () => {},
});

interface Props {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const addUser = async (
    userName: string,
    userEmail: string,
    userRole: string,
    jobTitle: string,
    departmentName: string
  ) => {
    const compId = localStorage.getItem("company");
    if (compId) {
      var pedCompId = JSON.parse(compId);
    }
    try {
      const res = await fetch("http://localhost:4000/api/user/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          userEmail,
          userRole,
          departmentName,
          jobTitle,
          companyId: pedCompId,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error(json);
        setError(json.message);
        return;
      }

      setUsers((prev) => [...prev, json.user]);
    } catch (err: any) {
      console.error("Failed to create user ", err);
      setError(err.message);
    }
  };

  const editUser = async (
    userId: string,
    userName: string,
    userEmail: string,
    userRole: string,
    jobTitle: string,
    departmentName: string
  ) => {
    try {
      const res = await fetch("http://localhost:4000/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          userName,
          userEmail,
          userRole,
          departmentName,
          jobTitle,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error(json);
        return;
      }

      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? json.user : user))
      );
    } catch (err) {
      console.error("Failed to create user ", err);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const res = await fetch("http://localhost:4000/api/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to delete user. Status: ${res.status}`);
      }
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        error,
        setUsers,
        deleteUser,
        editUser,
        addUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
