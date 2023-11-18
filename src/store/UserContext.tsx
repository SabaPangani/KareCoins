import { createContext, ReactNode, useState } from "react";
import { User } from "../shared/types/User";

interface UserContext {
  users: User[];
  setUsers: (users: User[]) => void;
  createUser: (userName: string) => void;
  updateUser: (userId: string, userName: string) => void;
  deleteUser: (userId: string) => void;
}

export const UserContext = createContext<UserContext>({
  users: [],
  setUsers: () => {},
  createUser: async () => {},
  updateUser: async () => {},
  deleteUser: async () => {},
});

interface Props {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  const createUser = async (departmentName: string) => {
    try {
      const res = await fetch("http://localhost:4000/api/user/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departmentName,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error(json);
        return;
      }
      console.log(json);

      setUsers((prev) => [...prev, json.department]);
    } catch (err) {
      console.error("Failed to create department ", err);
    }
  };

  const updateUser = async (
    departmentId: string,
    departmentName: string
  ) => {
    try {
      const res = await fetch("http://localhost:4000/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departmentId,
          departmentName,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error(json);
        return;
      }
      console.log(json.department);

      setUsers((prev) =>
        prev.map((department) =>
          department._id === departmentId ? json.department : department
        )
      );
    } catch (err) {
      console.error("Failed to create department ", err);
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
        setUsers,
        deleteUser,
        updateUser,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
