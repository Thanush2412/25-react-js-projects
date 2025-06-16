import React from 'react';
import InfiniteScrollGallery from './components/InfiniteScrollGallery';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Infinite Scroll Gallery</h1>
        <p>Scroll down to load more images</p>
      </header>
      <main>
        <InfiniteScrollGallery />
      </main>
    </div>
  );
}

export default App;
