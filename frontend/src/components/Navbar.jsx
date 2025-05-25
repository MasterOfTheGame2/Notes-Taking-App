import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); // You can save the username at login

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>NoteApp</div>
      <input type="text" placeholder="Search notes..." style={styles.search} />
      <div style={styles.actions}>
        <span style={styles.username}>{username || "user name"}</span>
        <Link to="/login">
          <button style={{ ...styles.button, ...styles.login }}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ ...styles.button, ...styles.signup }}>Signup</button>
        </Link>
        <button
          onClick={handleLogout}
          style={{ ...styles.button, ...styles.logout }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a1e2b",
    padding: "10px 20px",
    color: "white",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  search: {
    flex: 1,
    maxWidth: "300px",
    marginLeft: "20px",
    padding: "8px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#2d3244",
    color: "#ccc",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  username: {
    marginRight: "10px",
    fontSize: "1rem",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  login: {
    backgroundColor: "#007bff",
  },
  signup: {
    backgroundColor: "#28a745",
  },
  logout: {
    backgroundColor: "#dc3545",
  },
};

export default Navbar;
