import React, { useContext } from 'react';
import { StateContext } from './contexts';

export default function Todo({ title, description, author, dateCreated, complete, dateCompleted }) {
  const { dispatch } = useContext(StateContext);

  const handleToggleCompletion = () => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: { title }
    });
  };

  const handleDeleteTodo = () => {
    dispatch({
      type: 'DELETE_TODO',
      payload: { title }
    });
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>{description}</div>
      <i>Written by <b>{author}</b></i>
      <br />
      <label>
        <input type="checkbox" checked={complete} onChange={handleToggleCompletion} /> Completed
      </label>
      {complete && <span>Completed on: {dateCompleted}</span>}
      <button onClick={handleDeleteTodo} style={{ marginTop: '10px' }}>Delete Todo</button>
    </div>
  );
}