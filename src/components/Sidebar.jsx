import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Heart } from "lucide-react"; // Ensure: npm install lucide-react

const Sidebar = ({ logo }) => {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-64 bg-indigo-900 text-white 
      flex flex-col justify-between shadow-xl z-40 hidden md:flex"
    >
      <div className="flex flex-col items-center mt-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto rounded-full border-2 border-indigo-400 shadow-md"
          />
        </div>

        {/* Navigation Links */}
        <nav className="w-full space-y-3 px-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-700 text-white shadow-md"
                  : "text-gray-200 hover:bg-indigo-700 hover:text-white"
              }`
            }
          >
            <Home className="mr-3" size={20} />
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-700 text-white shadow-md"
                  : "text-gray-200 hover:bg-indigo-700 hover:text-white"
              }`
            }
          >
            <Heart className="mr-3" size={20} />
            Favorites
          </NavLink>
        </nav>
      </div>

      {/* Footer Text */}
      <p className="text-center text-xs text-gray-300 mb-4">
        © {new Date().getFullYear()} Book Library
      </p>
    </aside>
  );
};

export default Sidebar;
