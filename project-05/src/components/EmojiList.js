import React from 'react';

function EmojiList({ emojis }) {
  return (
    <div className="emoji-list">
      {emojis.map((emoji) => (
        <div key={emoji.name} className="emoji-item">
          <span className="emoji">{emoji.symbol}</span>
          <span className="emoji-name">{emoji.name}</span>
        </div>
      ))}
    </div>
  );
}

export default EmojiList; 