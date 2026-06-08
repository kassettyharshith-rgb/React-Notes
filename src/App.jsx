import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import NoteForm from "./components/NoteForm.jsx";
import NoteList from "./components/NoteList.jsx";
import { loadNotes, saveNotes, loadTheme, saveTheme } from "./utils/storage.js";
import { toast, Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const isFirstMount = useRef(true);

  // Load notes and theme on mount
  useEffect(() => {
    const storedNotes = loadNotes();
    if (storedNotes) setNotes(storedNotes);
    const storedTheme = loadTheme();
    setDarkMode(storedTheme === "dark");
    isFirstMount.current = false;
  }, []);

  // Persist notes when they change (skip first mount)
  useEffect(() => {
    if (isFirstMount.current) return;
    saveNotes(notes);
  }, [notes]);

  // Persist theme and toggle class on html element
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    saveTheme(theme);
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.classList.toggle("light", !darkMode);
  }, [darkMode]);

  const addNote = (note) => {
    if (editingNote) {
      setNotes(notes.map((n) => (n.id === editingNote.id ? note : n)));
      setEditingNote(null);
      toast.success("Note updated");
    } else {
      setNotes([note, ...notes]);
      toast.success("Note added");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    toast.success("Note deleted");
  };

  const editNote = (note) => {
    setEditingNote(note);
  };

  const filteredNotes = notes.filter((n) => {
    const term = searchTerm.toLowerCase();
    return (
      n.title.toLowerCase().includes(term) ||
      n.description.toLowerCase().includes(term)
    );
  });

  return (
    <div className="app">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <NoteForm addNote={addNote} editingNote={editingNote} setEditingNote={setEditingNote} />
        <NoteList notes={filteredNotes} onEdit={editNote} onDelete={deleteNote} />
        <Toaster position="bottom-right" />
      </main>
    </div>
  );
}

export default App;
