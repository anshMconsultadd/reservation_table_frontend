import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login, user } = useContext(AuthContext)!;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
    console.log(user);
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <div className="w-full flex flex-col justify-center items-center relative">
        
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Welcome to Table Reservation Application
        </h1>

        
        <div className="bg-white shadow-xl rounded-lg p-8 w-96">
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

          <p className="mt-4 text-center">
            New user? <Link to="/signup" className="text-blue-600 font-semibold">Sign up</Link>
          </p>
        </div>

      
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-4">Made by</p>
          <a href="https://github.com/anshMconsultadd/" target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_640.png"
              alt="GitHub Logo"
              className="h-8 mx-auto"
            />
           <b> Ansh Mehta</b>
          </a>
          <div className="flex justify-center mt-4 space-x-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" className="h-13" alt="React" />
            <img src="https://seeklogo.com/images/F/fastapi-logo-A3EDAAABDB-seeklogo.com.png" className="h-13" alt="FastAPI" />
            <img src="https://www.svgrepo.com/show/303251/mysql-logo.svg" className="h-18 " alt="MySQL" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" className="h-13" alt="TypeScript" />
            <img src="https://logos-world.net/wp-content/uploads/2024/10/Vercel-Logo.jpg" className="h-13" alt="Vercel" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
