import React from 'react';
import NoteCard from './NoteCard.jsx';

// Props:
//   notes: array of note objects
//   onEdit: function(note) – called when edit button is pressed
//   onDelete: function(id) – called when delete button is confirmed

function NoteList({ notes, onEdit, onDelete }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No notes yet. Add a note to get started!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={() => onEdit(note)}
          onDelete={() => onDelete(note.id)}
        />
      ))}
    </div>
  );
}

export default NoteList;
