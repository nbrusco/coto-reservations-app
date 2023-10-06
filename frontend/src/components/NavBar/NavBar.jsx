import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-gray-900/70 p-4 py-6 rounded-md w-[80vw]">
      <div className="flex items-center justify-between">
        <NavLink to="/" className="text-white text-2xl font-bold">
          Home
        </NavLink>
        <ul className="flex space-x-4">
          <li>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="text-white">
                Login
              </NavLink>
            )}
          </li>
          <li>
            <NavLink to="/reservas" className="text-white">
              Mis reservas
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
