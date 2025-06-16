import React, { useState, useEffect } from 'react';
import { initialItems } from '../data';
import './DragAndDropList.css';

const DragAndDropList = () => {
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    e.target.classList.remove('dragging');
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggedItem) {
      const updatedItems = items.map(item =>
        item.id === draggedItem.id ? { ...item, status } : item
      );
      setItems(updatedItems);
    }
  };

  const getStatusItems = (status) => {
    return items.filter(item => item.status === status);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const renderItem = (item) => (
    <div
      key={item.id}
      className={`list-item ${getPriorityClass(item.priority)}`}
      draggable
      onDragStart={(e) => handleDragStart(e, item)}
      onDragEnd={handleDragEnd}
    >
      <div className="item-header">
        <h3>{item.title}</h3>
        <span className={`priority-badge ${getPriorityClass(item.priority)}`}>
          {item.priority}
        </span>
      </div>
      <p>{item.description}</p>
    </div>
  );

  return (
    <div className="drag-drop-container">
      <div className="status-columns">
        <div
          className="status-column"
          onDragOver={(e) => handleDragOver(e, 'todo')}
          onDrop={(e) => handleDrop(e, 'todo')}
        >
          <h2>To Do</h2>
          <div className="items-container">
            {getStatusItems('todo').map(renderItem)}
          </div>
        </div>

        <div
          className="status-column"
          onDragOver={(e) => handleDragOver(e, 'in-progress')}
          onDrop={(e) => handleDrop(e, 'in-progress')}
        >
          <h2>In Progress</h2>
          <div className="items-container">
            {getStatusItems('in-progress').map(renderItem)}
          </div>
        </div>

        <div
          className="status-column"
          onDragOver={(e) => handleDragOver(e, 'completed')}
          onDrop={(e) => handleDrop(e, 'completed')}
        >
          <h2>Completed</h2>
          <div className="items-container">
            {getStatusItems('completed').map(renderItem)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDropList; 