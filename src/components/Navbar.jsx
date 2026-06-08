import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar({ darkMode, setDarkMode }) {
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <nav className="navbar">
      <h1 className="title">Notes App</h1>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </nav>
  );
}

export default Navbar;
