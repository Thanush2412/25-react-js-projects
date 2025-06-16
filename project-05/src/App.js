import React, { useState, useCallback } from 'react';
import './App.css';
import EmojiList from './components/EmojiList';
import SearchBar from './components/SearchBar';
import { emojiList } from './data/emojiData';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmojis, setFilteredEmojis] = useState(emojiList);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    const filtered = emojiList.filter(emoji => 
      emoji.name.toLowerCase().includes(term.toLowerCase()) ||
      emoji.keywords.some(keyword => 
        keyword.toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredEmojis(filtered);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Emoji Search</h1>
        <SearchBar onSearch={handleSearch} />
        <EmojiList emojis={filteredEmojis} />
      </div>
    </div>
  );
}

export default App;
