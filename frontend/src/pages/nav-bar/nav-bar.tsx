import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

interface NavbarProps {
  isLoggedIn: boolean;
}

export const Navbar = ({ isLoggedIn }: NavbarProps) => {
  const { logout } = useAuth();

  return (
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between w-full">
          <Link
              to={isLoggedIn ? "/board" : "/"}
              className="text-white text-2xl font-bold"
          >
            Job Tracker
          </Link>
          <div className="flex space-x-4">
            {isLoggedIn ? (
                <>
                  <Link to="/" className="text-gray-300 hover:text-white" onClick={logout}>
                    Log Out
                  </Link>
                </>
            ) : (
                <>
                  <Link to="/login" className="text-gray-300 hover:text-white">
                    Log in
                  </Link>
                  <Link to="/register" className="text-gray-300 hover:text-white">
                    Sign up
                  </Link>
                </>
            )}
          </div>
        </div>
      </nav>
  );
};
