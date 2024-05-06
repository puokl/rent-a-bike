import React, { createContext, useState, useContext, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  sub: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleLogin: (token: string) => {},
  handleLogout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (token: string) => {
    const decodedUser = jwtDecode(token) as User;
    localStorage.setItem("userId", decodedUser.sub);
    localStorage.setItem("userRole", JSON.stringify(decodedUser.roles));
    localStorage.setItem("token", token);
    setUser(decodedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
