import React from 'react';
import DragAndDropList from './components/DragAndDropList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Drag and Drop Task Manager</h1>
      </header>
      <main>
        <DragAndDropList />
      </main>
    </div>
  );
}

export default App;
