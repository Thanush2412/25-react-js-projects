import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input);
    }, 300); // 300ms debounce delay

    return () => clearTimeout(timer);
  }, [input, onSearch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search emojis..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar; 