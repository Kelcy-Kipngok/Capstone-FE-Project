import React from "react";
import DarkModeToggle from "./DarkModeToggle";

function Navbar({ onNavigate }) {
  return (
    <header className="bg-indigo-700 text-white shadow-md py-3">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("home")}>
          <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full shadow-md" />
          <h1 className="text-2xl font-bold tracking-tight">Book Library</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("favorites")} className="hover:text-yellow-300 transition">
            ❤️ Favorites
          </button>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
