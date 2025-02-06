import { createContext, useState, useEffect, ReactNode } from "react";

import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: { username: string; role: string } | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedUser = localStorage.getItem("user");

  const [user, setUser] = useState<{ username: string; role: string } | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      if (decoded) {
        const userData = { username: decoded.sub, role: decoded.role };
        setUser(userData);
      }
    }
  }, []);

  const login = async (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);
      const userData = { username: decodedToken.sub, role: decodedToken.role };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
