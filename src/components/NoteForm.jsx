import React, { useState, useEffect } from "react";

/**
 * NoteForm component for adding and editing notes.
 * Props:
 *   - addNote: function(note) – called to add or update a note
 *   - editingNote: note object being edited (null when adding)
 *   - setEditingNote: function to clear the editing state
 */
function NoteForm({ addNote, editingNote, setEditingNote }) {
  const isEdit = Boolean(editingNote);
  const [title, setTitle] = useState(editingNote?.title || "");
  const [description, setDescription] = useState(editingNote?.description || "");
  const [charCount, setCharCount] = useState(description.length);

  // Keep inputs in sync when editingNote changes
  useEffect(() => {
    setTitle(editingNote?.title || "");
    setDescription(editingNote?.description || "");
  }, [editingNote]);

  // Update character count whenever description changes
  useEffect(() => {
    setCharCount(description.length);
  }, [description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      alert("Title cannot be empty");
      return;
    }
    const noteData = {
      id: editingNote?.id || Date.now().toString(),
      title: trimmedTitle,
      description,
      createdAt: editingNote?.createdAt || new Date().toISOString()
    };
    addNote(noteData);
    // Reset form if we were adding a new note
    if (!isEdit) {
      setTitle("");
      setDescription("");
    } else {
      // Exit edit mode after updating
      setEditingNote(null);
    }
  };

  const handleCancel = () => {
    setEditingNote(null);
    setTitle("");
    setDescription("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? "Edit Note" : "Add New Note"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
      <div className="char-count">{charCount} characters</div>
      <div className="form-actions">
        <button type="submit" className="save-btn">
          {isEdit ? "Update" : "Add"}
        </button>
        {isEdit && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;

