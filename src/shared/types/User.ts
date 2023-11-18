import { Role } from "../enums/Role";
export interface User {
  name: string;
  email: string;
  password: string;
  contactNumber: number;
  companyName: string;
  companyId: number;
  departmentId: number;
  role: Role;
  jobTitle: string;
}

export interface Department {
  _id: string
  departmentName: string;
  companyId: string;
  totalCoin: number;
}
