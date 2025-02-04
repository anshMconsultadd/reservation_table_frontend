import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex h-screen bg-gray-100 min-h-screen flex items-center justify-center bg-cover bg-center ">
      <div className="w-full flex flex-col justify-center items-center relative">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Welcome to Table Reservation Application
        </h1>

        <div className="bg-white shadow-xl rounded-lg p-8 w-96">
          <LoginForm />

          <p className="mt-4 text-center">
            New user?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
