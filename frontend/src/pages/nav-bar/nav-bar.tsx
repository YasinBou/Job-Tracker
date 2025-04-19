import { Link } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
}

export const Navbar = ({ isLoggedIn }: NavbarProps) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="text-white text-2xl font-bold">
          To-Do List
        </Link>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-gray-300 hover:text-white">
                Profile
              </Link>
              <Link to="/" className="text-gray-300 hover:text-white">
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
