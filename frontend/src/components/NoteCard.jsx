import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit, deleteNote }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{note.title}</h3>
      <p style={styles.description}>{note.description}</p>
      <div style={styles.actions}>
        <FaEdit
          onClick={() => onEdit(note)}
          style={{ ...styles.icon, color: "#3b82f6" }}
        />
        <FaTrash
          onClick={() => deleteNote(note._id)}
          style={{ ...styles.icon, color: "#ef4444" }}
        />
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    position: "relative",
  },
  title: {
    margin: "0 0 8px",
    fontWeight: "bold",
    fontSize: "18px",
  },
  description: {
    margin: 0,
    color: "#555",
    fontSize: "15px",
  },
  actions: {
    position: "absolute",
    right: "12px",
    top: "12px",
    display: "flex",
    gap: "10px",
  },
  icon: {
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default NoteCard;
