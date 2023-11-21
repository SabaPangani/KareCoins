import { Role } from "../enums/Role";
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  contactNumber: number;
  companyName: string;
  companyId: string;
  departmentId: string;
  role: Role;
  jobTitle: string;
  totalCoin: number;
}

export interface Department {
  _id: string
  departmentName: string;
  companyId: string;
  totalCoin: number;
}
