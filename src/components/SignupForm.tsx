(window as any).TextEncoder = TextEncoder;
(window as any).TextDecoder = TextDecoder;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }

    setError(null);

    try {
      await signupUser(username, password, role);
      alert("Signup successful, please login.");
      navigate("/");
    } catch (error) {
      setError("Signup failed, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="w-96 bg-white shadow-xl rounded-lg p-8"
      >
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Signup
        </h1>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition duration-200"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
