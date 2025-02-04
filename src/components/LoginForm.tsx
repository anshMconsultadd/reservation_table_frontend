
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const LoginForm = () => {

    const { login } = useContext(AuthContext)!;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await loginUser(username, password);
        login(data.access_token); 
        const token = localStorage.getItem("token");
        if(token){
          const decoded: any = jwtDecode(token);
          if(decoded){
            const role = decoded.role;
            if (role === "admin") {
              navigate("/admin");
            } else {
              navigate("/dashboard");
            }
          }
        }
      
          
    
      };

      return(
        <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition duration-200"
            >
              Login
            </button>
          </form>
      )

}
export default LoginForm;;