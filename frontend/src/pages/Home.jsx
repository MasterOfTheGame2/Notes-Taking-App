import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_URL}/api/note`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setCurrentNote(null); // reset when closing
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  const addNote = async (title, description) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/api/note/add`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Note added!");
        closeModal();
        fetchNotes(); // refresh notes list after adding
      } else {
        console.log("Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Note updated!");
        closeModal();
        fetchNotes();
      } else {
        console.log("Failed to update note");
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${API_URL}/api/note/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log("Note deleted!");
        fetchNotes();
      } else {
        console.log("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={onEdit}
            deleteNote={deleteNote}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setCurrentNote(null);
          setModalOpen(true);
        }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#10b981",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        +
      </button>
      {isModalOpen && (
        <NoteModal
          addNote={addNote}
          onCancel={closeModal}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
