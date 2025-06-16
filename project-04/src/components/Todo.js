import React from 'react';

function Todo({ todo, toggleComplete, removeTodo }) {
  return (
    <div className="todo-item">
      <div 
        className={`todo-text ${todo.completed ? 'completed' : ''}`}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </div>
      <button 
        className="delete-btn"
        onClick={() => removeTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Todo; 