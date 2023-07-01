import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [list, setList] = useState(() => {
    const savedState = localStorage.getItem("taskList");
    const tasks = JSON.parse(savedState);
    return tasks || [];
  });
  const [input, setInput] = useState('');
  const [edit, setEdit] = useState(null);
  const [editedTodoValue, setEditedTodoValue] = useState('');

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(list));
  }, [list]);

  const addTodo = (todo) => {
    if (todo.trim() === "") {
      return; // Skip adding empty todos
    }
    
    const newTodo = {
      id: Math.random(),
      todo: todo,
    };

    setList([...list, newTodo]);
    setInput('');
  };

  const deleteTodo = (id) => {
    const newList = list.filter((todo) => todo.id !== id);
    setList(newList);
  };

  const editTodo = (id) => {
    const updatedTodo = list.find((todo) => todo.id === id);
    setEditedTodoValue(updatedTodo.todo);
    setEdit(id);
  };

  const handleEditInputChange = (e) => {
    setEditedTodoValue(e.target.value);
  };

  const handleSave = (id) => {
    const updatedList = list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, todo: editedTodoValue };
      }
      return todo;
    });
    setList(updatedList);
    setEdit(null);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a todo..."
        />
        <button className="add-button" onClick={() => addTodo(input)}>
          Add
        </button>
      </div>
      <ul className="todo-list">
        {list.map((todo) => (
          <li key={todo.id}>
            <div className="todo-text">
              {edit === todo.id ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editedTodoValue}
                  onChange={handleEditInputChange}
                />
              ) : (
                todo.todo
              )}
            </div>
            <div className="button-container">
              <button
                className="edit-button"
                onClick={() => (edit === todo.id ? handleSave(todo.id) : editTodo(todo.id))}
              >
                {edit === todo.id ? 'Save' : 'Edit'}
              </button>
              <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
                &times;
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
