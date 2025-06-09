import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

interface NavbarProps {
  isLoggedIn: boolean;
}

export const Navbar = ({ isLoggedIn }: NavbarProps) => {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to={isLoggedIn ? "/board" : "/"}
            className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors"
          >
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Job Tracker</span>
          </Link>

          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
