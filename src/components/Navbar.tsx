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
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-gray-300 transition-colors"
        >
          Table Reservation
        </Link>

        <div className="space-x-6 hidden md:flex">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-lg hover:text-gray-300 transition-all"
              >
                Dashboard
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-lg hover:text-gray-300 transition-all"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-lg hover:text-gray-300 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-lg hover:text-gray-300 transition-all"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
