import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ Improved error handling
  const navigate = useNavigate();

  // ✅ Correct environment variable access for Vite
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        // ✅ Fixed typo (sucess → success)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user.name);
        navigate("/");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* ✅ Display error messages */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email" // ✅ Changed to "email" for better validation
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
