import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "./type/user";

type UserContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  register: (user: User) => void;
  userList: User[];
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]);

  const register = (userData: User) => {
    const storedUsers = localStorage.getItem("registeredUsers");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const updatedUsers = [...users, userData];
    setUserList(updatedUsers);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    setIsLoggedIn(false);
  };

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

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, user, userList, register, login, logout }}
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
