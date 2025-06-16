import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    
    addTodo(value);
    setValue('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit" className="add-btn">
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm; 