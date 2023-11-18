import { createContext, ReactNode, useState } from "react";
import { Department } from "../shared/types/User";
import { json } from "react-router";

interface DepContext {
  departments: Department[];
  setDepartments: (departments: Department[]) => void;
  createDepartment: (departmentName: string) => void;
  deleteDepartment: (departmentId: string) => void;
  updateDepartment: (departmentId: string, departmentName: string) => void;
}

export const DepContext = createContext<DepContext>({
  departments: [],
  setDepartments: () => {},
  createDepartment: async () => {},
  updateDepartment: async () => {},
  deleteDepartment: async () => {},
});

interface Props {
  children: ReactNode;
}

export const DepContextProvider = ({ children }: Props) => {
  const [departments, setDepartments] = useState<Department[]>([]);

  const createDepartment = async (departmentName: string) => {
    const compId = localStorage.getItem("company");
    if (compId) {
      var pedCompId = JSON.parse(compId);
    }
    try {
      const res = await fetch("http://localhost:4000/api/department/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          departmentName,
          companyId: pedCompId,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error(json);
        return;
      }
      console.log(json);

      setDepartments((prev) => [...prev, json.department]);
    } catch (err) {
      console.error("Failed to create department ", err);
    }
  };

  const updateDepartment = async (
    departmentId: string,
    departmentName: string
  ) => {
    try {
      const res = await fetch("http://localhost:4000/api/department/update", {
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

      setDepartments((prev) =>
        prev.map((department) =>
          department._id === departmentId ? json.department : department
        )
      );
    } catch (err) {
      console.error("Failed to create department ", err);
    }
  };

  const deleteDepartment = async (departmentId: string) => {
    try {
      const res = await fetch("http://localhost:4000/api/department/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ departmentId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to delete department. Status: ${res.status}`);
      }
      setDepartments((prev) => prev.filter((dep) => dep._id !== departmentId));
    } catch (err) {
      console.error("Error deleting department:", err);
    }
  };

  return (
    <DepContext.Provider
      value={{
        departments,
        setDepartments,
        deleteDepartment,
        updateDepartment,
        createDepartment,
      }}
    >
      {children}
    </DepContext.Provider>
  );
};
