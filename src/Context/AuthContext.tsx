import React, { createContext, useState, useContext, ReactNode} from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../Constants/route.ts';

interface AuthContextType {
  token: string | null;
  userRole: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState<string>(localStorage.getItem("role") || 'user');
  const navigate = useNavigate();

  const login = (token: string, userrole: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', userrole);
    setToken(token);
    setUserRole(userrole);
    navigate(ROUTES.DASHBOARD); // Redirect after login
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setUserRole('user');
    navigate(ROUTES.DASHBOARD); // Redirect after logout
    alert("Logout successful");
  };

  const isAuthenticated = !!token;
  const isAdmin = userRole === 'admin';
  return (
    <AuthContext.Provider value={{ token, userRole, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};