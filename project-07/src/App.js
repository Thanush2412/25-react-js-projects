import React, { useState } from 'react';
import './App.css';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="App">
      <div className="container">
        <h1>Modal Popup Demo</h1>
        <button 
          className="open-modal-btn"
          onClick={openModal}
        >
          Open Modal
        </button>

        <Modal 
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Welcome to Modal Demo"
        >
          <div className="modal-demo-content">
            <p>This is a demonstration of a modal popup using React Portals.</p>
            <p>Features:</p>
            <ul>
              <li>Click outside to close</li>
              <li>Press ESC to close</li>
              <li>Accessible with keyboard navigation</li>
              <li>Backdrop click handling</li>
              <li>Body scroll lock when open</li>
            </ul>
            <button 
              className="close-modal-btn"
              onClick={closeModal}
            >
              Close Modal
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
