import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setSuccess("");
      return;
    }

    // ✅ Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check if username already exists
    const userExists = existingUsers.some((user) => user.username === username);
    if (userExists) {
      setError("Username already exists! Please choose another.");
      setSuccess("");
      return;
    }

    // ✅ Save new user
    const newUser = { username, password };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    setSuccess("Account created successfully! Redirecting to login...");
    setError("");

    // ✅ Redirect to login after short delay
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#800020]">
          Sign Up
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
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#800020] text-white py-2 rounded-lg hover:bg-[#9b1233]"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#800020] font-semibold">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
