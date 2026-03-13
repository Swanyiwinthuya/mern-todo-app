import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const Create = () => {
  const [task, setTask] = useState('');

  const createTask = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    axios.post('/add', { task: trimmedTask })
      .then(() => {
        setTask('');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Todo List</h1>
      <div className="create-form">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <button onClick={createTask}>ADD</button>
      </div>
    </>
  );
};

export default Create;