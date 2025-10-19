import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ logo, query, setQuery, isLoggedIn, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide search bar on login and signup pages
  const isLoginPage = location.pathname === "/login" || location.pathname === "/signup";

  // Retrieve logged in user
  const loggedInUser = localStorage.getItem("currentUser");

  return (
    <header
      className="flex flex-col md:flex-row justify-between items-center px-6 py-4 shadow-md bg-white/90 sticky top-0 z-50"
      style={{ borderBottom: "2px solid #800020" }}
    >
      {/* LOGO + TITLE */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(isLoggedIn ? "/" : "/login")}
      >
        <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
        <h1 className="text-2xl font-bold text-[#800020]">Book Explorer</h1>
      </div>
 {/* ✅ Show Welcome Message */}
      {isLoggedIn && (
        <div className="text-center mt-4 text-lg font-semibold text-[#800020]">
          Welcome, <strong>{loggedInUser}</strong>👋
        </div>
      )}

      

      {/* 🔐 AUTH + NAVIGATION BUTTONS */}
      <div className="mt-4 md:mt-0 flex items-center gap-4">
        {isLoggedIn ? (
          <>
           

            <button
              onClick={() => navigate("/")}
              className="bg-[#800020] text-white px-4 py-2 rounded-md hover:bg-[#9b1233]"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/favorites")}
              className="bg-[#800020] text-white px-4 py-2 rounded-md hover:bg-[#9b1233]"
            >
              Favorites
            </button>

            <button
              onClick={onLogout}
              className="bg-[#800020] text-white px-4 py-2 rounded-md hover:bg-[#9b1233]"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#800020] text-white px-4 py-2 rounded-md hover:bg-[#9b1233]"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
