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
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthAction {
  type: string;
  payload: User;
}

interface AuthContextType {
  dispatch: React.Dispatch<AuthAction>;
  user: User;
  handleStep1: (name: string, phoneNum: number) => void;
  handleStep2: (compName: string, email: string) => void;
  handleStep3: (password: string) => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: initialUser,
};

export const AuthContext = createContext<AuthContextType>({
  dispatch: () => {},
  user: initialUser,
  handleStep1: () => {},
  handleStep2: () => {},
  handleStep3: () => {},
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

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [user, setUser] = useState<User>(initialUser);

  const handleStep1 = (name: string, phoneNum: number) => {
    setUser((prev) => {
      return { ...prev, name, contactNumber: phoneNum };
    });
  };
  const handleStep2 = (companyName: string, email: string) => {
    setUser((prev) => {
      return { ...prev, companyName, email };
    });
  };
  const handleStep3 = (password: string) => {
    setUser((prev) => {
      return { ...prev, password };
    });
  };
  useEffect(() => {
    console.log(
      user.name,
      user.contactNumber,
      user.companyName,
      user.email,
      user.password
    );
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, dispatch, handleStep1, handleStep2, handleStep3 }}
    >
      {children}
    </AuthContext.Provider>
  );
};
