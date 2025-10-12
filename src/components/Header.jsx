import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Heart } from "lucide-react"; // icons

const burgundy = "#800020";

const Header = ({ logo, query, setQuery, searchType, setSearchType }) => {
  return (
    <header className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-8">
      {/* Logo and Title */}
      <div className="flex items-center mb-3 md:mb-0">
        <img src={logo} alt="Book Library Logo" className="h-10 w-auto mr-3" />
        <h1
          className="text-2xl md:text-3xl font-bold"
          style={{ color: burgundy }}
        >
          📚 Book Library
        </h1>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex space-x-4 mb-3 md:mb-0">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-white text-indigo-900 font-semibold"
                : "hover:bg-indigo-700"
            }`
          }
        >
          <Home className="mr-2" size={18} />
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-lg transition-colors ${
              isActive
                ? "bg-white text-indigo-900 font-semibold"
                : "hover:bg-indigo-700"
            }`
          }
        >
          <Heart className="mr-2" size={18} />
          Favorites
        </NavLink>
      </nav>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded-lg w-64 bg-indigo-700 text-white placeholder-gray-300 focus:outline-none"
        />
      </div>
    </header>
  );
};

export default Header;
