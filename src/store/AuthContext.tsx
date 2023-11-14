import React, { ReactNode, createContext, useReducer } from "react";

enum Role {
  "Admin",
  "Head",
  "User",
}

interface User {
  name: string;
  email: string;
  password: string;
  contactNumber: number;
  companyId: number;
  departmentId: number;
  role: Role;
  jobTitle: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthAction {
  type: string;
  payload: User | null;
}

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => {},
});

interface Props {
  children: ReactNode;
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, user: action.payload };

    case "LOGOUT":
      return { isAuthenticated: false, user: null };

    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
