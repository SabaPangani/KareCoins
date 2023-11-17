import React, {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { User } from "../shared/types/User";
import { Role } from "../shared/enums/Role";
const initialUser: User = {
  name: "",
  email: "",
  password: "",
  contactNumber: 0,
  companyName: "",
  companyId: 0,
  departmentId: 0,
  role: Role.User,
  jobTitle: "",
};

interface AuthState {
  user: User | null;
}

interface AuthAction {
  type: string;
  payload: User | null;
}

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  user: User;
  handleStep1: (name: string, phoneNum: number) => void;
  handleStep2: (compName: string, email: string) => void;
}

const initialState: AuthState = {
  user: initialUser,
};

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => {},
  user: initialUser,
  handleStep1: () => {},
  handleStep2: () => {},
});

interface Props {
  children: ReactNode;
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [user, setUser] = useState<User>(initialUser);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      let parsedUser = JSON.parse(user);
      dispatch({ type: "LOGIN", payload: parsedUser });
    }
  }, []);

  const handleStep1 = (name: string, phoneNum: number) => {
    setUser((prev) => {
      return { ...prev, name, contactNumber: phoneNum };
    });
  };
  const handleStep2 = async (companyName: string, email: string) => {
    setUser((prev) => {
      const updatedUser = { ...prev, companyName, email };
      console.log(updatedUser);
      return updatedUser;
    });
    try {
      console.log(companyName);
      const res = await fetch(
        "http://localhost:4000/api/company/create-company",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: companyName }),
        }
      );
      if (!res.ok) {
        const json = await res.json();
        console.log(json);
        return;
      }
    } catch (err) {
      console.error("Error in handleStep2:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ state, user, dispatch, handleStep1, handleStep2 }}
    >
      {children}
    </AuthContext.Provider>
  );
};
