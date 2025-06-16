import React, { useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1>Todo List</h1>
        <TodoForm addTodo={addTodo} />
        <div className="todo-list">
          {todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
            />
          ))}
        </div>
        {todos.length === 0 && (
          <p className="empty-message">No todos yet! Add one above.</p>
        )}
      </div>
    </div>
  );
}

export default App;
