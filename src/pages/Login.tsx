import { useState, useContext,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login, user } = useContext(AuthContext)!;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   await login(username, password);
  //   console.log(user);
  //   if (user?.role === "admin") {
  //     navigate("/admin");
  //   } else {
  //     navigate("/dashboard");
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password); 
  };

useEffect(() => {
  if (user?.role) {
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }
}, [user, navigate]); 
  

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
        </div>
      </div>
    </div>
  );
};

export default Login;
