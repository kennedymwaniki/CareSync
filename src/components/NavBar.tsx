import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
const NavBar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
        </li>
        <li>
          <Link to="/login" className="text-white hover:text-gray-200">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="text-white hover:text-gray-200">
            Register
          </Link>
        </li>
        <li>
          <Link to="/patient" className="text-white hover:text-gray-200">
            Patient
          </Link>
        </li>
        <li>
          <Link to="/doctor" className="text-white hover:text-gray-200">
            Doctor
          </Link>
        </li>
        <li>
          <Link to="/careProvider" className="text-white hover:text-gray-200">
            care Provider
          </Link>
        </li>
        <li>
          <Link to="/admin" className="text-white hover:text-gray-200">
            {isAuthenticated ? "Dashboard" : "want to see dashboard"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
