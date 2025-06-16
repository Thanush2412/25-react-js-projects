import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm; 