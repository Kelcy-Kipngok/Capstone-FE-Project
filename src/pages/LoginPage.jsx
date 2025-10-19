import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (validUser) {
      onLogin(username);
      setSuccess(`Welcome, ${username}! Redirecting to your library...`);
      setError("");

      setTimeout(() => navigate("/"), 1500);
    } else {
      setError("Invalid username or password.");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#800020]">
          Login
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#800020] text-white py-2 rounded-lg hover:bg-[#9b1233]"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#800020] font-semibold">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
