import React, { useContext } from 'react';
import { TodoContext } from './context/TodoContext';

export default function Todo({ title, description, author, dateCreated, complete: initialComplete, dateCompleted: initialDateCompleted }) {
    const { dispatch } = useContext(TodoContext);

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
            <br />
            <i>Written by <b>{author}</b></i>
            <br />
            <label>
                <input type="checkbox" checked={initialComplete} onChange={handleToggleCompletion} /> Completed
            </label>
            <br />
            {initialComplete && <span>Completed on: {initialDateCompleted}</span>}
            <button onClick={handleDeleteTodo} style={{ marginTop: '10px' }}>Delete Todo</button>
        </div>
    );
}
