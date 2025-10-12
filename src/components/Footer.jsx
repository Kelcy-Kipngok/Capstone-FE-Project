import React from "react";

const Footer = ({ logo }) => {
  return (
    <footer className="bg-indigo-700 text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
          <span className="font-semibold"></span>
        </div>
        <p className="text-sm mt-2 sm:mt-0">
          © {new Date().getFullYear()} Book Library. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
