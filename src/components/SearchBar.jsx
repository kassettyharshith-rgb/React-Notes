import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      className="search-input"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
