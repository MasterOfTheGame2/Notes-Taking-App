import React, { useState } from "react";
import axios from "axios";
import "./Signup.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL; // Use Vite's env variable

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        // Fix typo here
        navigate("/");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      setError("Error signing up. Please check your details and try again.");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display error message */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email" // Change to "email" for validation
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
        <button type="submit">Signup</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
