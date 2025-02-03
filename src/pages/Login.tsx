import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://tse3.mm.bing.net/th?id=OIG3.qAouo4jci6XEudXQhXFN&pid=ImgGn')" }}></div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-4">Login</h1>
        <form onSubmit={handleLogin} className="w-80">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-2 p-2 border"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-2 p-2 border"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2">Login</button>
        </form>
        <p className="mt-4">
          New user? <a href="/signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
