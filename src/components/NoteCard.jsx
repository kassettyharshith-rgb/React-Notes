import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function NoteCard({ note, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
  };

  const formattedDate = new Date(note.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      className="note-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="actions">
        <button onClick={() => onEdit(note)} aria-label="Edit note">
          <FaEdit />
        </button>
        <button onClick={handleDelete} aria-label="Delete note">
          <FaTrash />
        </button>
      </div>
      <h3>{note.title}</h3>
      <p>{note.description.length > 150 ? note.description.slice(0, 150) + '...' : note.description}</p>
      <div className="date">Created: {formattedDate}</div>
    </motion.div>
  );
}

export default NoteCard;
