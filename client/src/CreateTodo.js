import React, { useState, useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import { StateContext } from './contexts';

export default function CreateTodo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { state, dispatch } = useContext(StateContext);
  const [todo, createTodo] = useResource((todo) => ({
    url: '/todos',
    method: 'post',
    data: todo
  }));

  useEffect(() => {
    if (todo && todo.data) {
      dispatch({ type: 'ADD_TODO', payload: todo.data });
    }
  }, [todo, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      createTodo({
        title,
        description,
        author: state.user.user,
        dateCreated: new Date().toISOString(),
        complete: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="author">Author:</label>
      <input 
        type="text"
        name="author"
        id="author"
        value={state.user.user}
        readOnly
      />
      <br />
      <label htmlFor="title">Title:</label>
      <input 
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />
      <label htmlFor="description">Description:</label>
      <textarea 
        name="description"
        id="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <br />
      <input type="submit" value="Add Todo" />
    </form>
  );
}
