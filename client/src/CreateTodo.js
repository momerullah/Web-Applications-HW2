import React, { useState, useContext } from 'react';
import { StateContext } from './contexts'; // Import the combined StateContext

export default function CreateTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { state, dispatch } = useContext(StateContext); // Use the combined context

    const handleSubmit = () => {
        if (title.trim() && description.trim()) {
            dispatch({
                type: 'CREATE_TODO',
                payload: {
                    title: title,
                    description: description,
                    author: state.user.user, // Access the user from the combined state
                }
            });
            setTitle('');
            setDescription('');
        }
    };

    return (
        <form onSubmit={e => {
            e.preventDefault();
            handleSubmit();
        }}>
            <label htmlFor="author">Author:</label>
            <input 
                type="text"
                name="author"
                id="author"
                value={state.user.user} // Access the user from the combined state
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
