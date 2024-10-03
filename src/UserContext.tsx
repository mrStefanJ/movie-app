import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "./type/user";

type UserContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => void;
  userList: User[];
  setUserList: (users: User[]) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>(() => {
    const storedUser = localStorage.getItem("registeredUsers");
    return storedUser ? JSON.parse(storedUser) : [];
  });

  useEffect(() => {
    initializeUser();
    // eslint-disable-next-line
  }, []);

  const updateUserList = (users: User[]) => {
    setUserList(users);
    localStorage.setItem("registeredUsers", JSON.stringify(users)); // Update localStorage
  };
  // Function to register a new user
  const register = (userData: User) => {
    const storedUsers = localStorage.getItem("registeredUsers");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    // Check if there are any users in the list, if not assign "Admin" role
    const role = users.length === 0 ? "admin" : "user";

    const newUser = { ...userData, role };

    const updatedUsers = [...users, newUser];
    updateUserList(updatedUsers);

    setIsLoggedIn(false);
  };
  // Function to log in a user
  const login = (userData: User) => {
    const storedUsers = localStorage.getItem("registeredUsers");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const foundUser = users.find((user: User) => user.email === userData.email);

    if (foundUser) {
      setUser(foundUser);
      setIsLoggedIn(true);
      localStorage.setItem("userData", JSON.stringify(foundUser));
    } else {
      setIsLoggedIn(false);
    }
  };
  // Function to check if a user is already logged in
  const initializeUser = () => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const loggedUser = JSON.parse(storedUserData);
      setUser(loggedUser);
      setIsLoggedIn(true);
    }
  };
  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        user,
        userList,
        setUserList,
        register,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
