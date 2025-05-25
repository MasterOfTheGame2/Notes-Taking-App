import React, { useEffect, useState } from "react";

const NoteModal = ({ addNote, onCancel, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (currentNote) {
      await editNote(currentNote._id, title, description);
    } else {
      await addNote(title, description);
    }

    setTitle("");
    setDescription("");
    onCancel(); // Corrected: close the modal via prop
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        {currentNote ? "Edit Note" : "Add New Note"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Note Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
        />
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.addButton}>
            {currentNote ? "Edit Note" : "Add Note"}
          </button>
          <button type="button" style={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    background: "#fff",
    padding: "20px",
    borderRadius: "6px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "20px auto",
  },
  heading: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    background: "none",
    color: "#ef4444",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
  },
};

export default NoteModal;
