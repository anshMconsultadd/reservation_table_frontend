import { createContext, useState, useEffect, ReactNode } from "react";
import { loginUser } from "../services/authService";
import { jwtDecode } from "jwt-decode";


interface AuthContextType {
  user: { username: string; role: string } | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
 
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");


  const [token, setToken] = useState<string | null>(storedToken);
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    storedUser ? JSON.parse(storedUser) : null
  );


  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);


  const login = async (username: string, password: string) => {
    try {
      const data = await loginUser(username, password); 
      const decodedToken: any = jwtDecode(data.access_token); 

      const userData = { username, role: decodedToken.role }; 

      
      setToken(data.access_token);
      setUser(userData);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
