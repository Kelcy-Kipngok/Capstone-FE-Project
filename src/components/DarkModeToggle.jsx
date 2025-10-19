import React, { useEffect, useState } from "react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md shadow hover:scale-105 transition"
      title="Toggle dark mode"
    >
      {darkMode ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}

export default DarkModeToggle;
