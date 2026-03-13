import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
  BsPencil
} from 'react-icons/bs';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [updatetask, setUpdatetask] = useState('');
  const [taskid, setTaskid] = useState('');

  useEffect(() => {
    axios.get('/get')
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const edit = (id) => {
    axios.put(`/edit/${id}`)
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? { ...todo, done: !todo.done } : todo
        );
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  const updateTodo = (id, updatedTask) => {
    axios.put(`/update/${id}`, { task: updatedTask })
      .then(() => {
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? { ...todo, task: updatedTask } : todo
        );
        setTodos(updatedTodos);
        setTaskid('');
        setUpdatetask('');
      })
      .catch((err) => console.log(err));
  };

  const Hdelete = (id) => {
    axios.delete(`/delete/${id}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No tasks found</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => edit(todo._id)}>
              {todo.done ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}

              {taskid === todo._id ? (
                <input
                  type="text"
                  value={updatetask}
                  onChange={(e) => setUpdatetask(e.target.value)}
                />
              ) : (
                <p className={todo.done ? 'through' : 'normal'}>
                  {todo.task}
                </p>
              )}
            </div>

            <div>
              <BsPencil
                className="icon"
                onClick={() => {
                  if (taskid === todo._id) {
                    updateTodo(todo._id, updatetask);
                  } else {
                    setTaskid(todo._id);
                    setUpdatetask(todo.task);
                  }
                }}
              />
              <BsFillTrashFill
                className="icon"
                onClick={() => Hdelete(todo._id)}
              />
            </div>
          </div>
        ))
      )}
    </main>
  );
};

export default Home;