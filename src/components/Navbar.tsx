import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-gray-200 transition duration-200"
        >
          Table Reservation
        </Link>

        <div className="space-x-4">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-300 transition duration-200"
              >
                Dashboard
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="hover:text-gray-300 transition duration-200"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="hover:text-gray-300 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-gray-300 transition duration-200"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
