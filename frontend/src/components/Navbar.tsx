import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        RealEstate
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-gray-600 font-semibold hover:text-blue-600"
        >
          Home
        </Link>
        {user && (
          <Link
            to="/dashboard"
            className="text-gray-600 font-semibold hover:text-blue-600"
          >
            Dashboard
          </Link>
        )}

        <div className="flex items-center gap-4 border-l pl-6">
          {user ? (
            <>
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  Welcome,
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-800 font-bold">{user.name}</span>
                  <span className="bg-blue-100 text-blue-600 text-[9px] px-2 py-0.5 rounded font-bold uppercase">
                    {user.role}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
              >
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 font-bold">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
