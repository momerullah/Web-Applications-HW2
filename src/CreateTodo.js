import React, { useState, useContext } from 'react';
import { TodoContext } from './context/TodoContext';
import { UserContext } from './context/UserContext';

export default function CreateTodo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { dispatch: todoDispatch } = useContext(TodoContext);
    const { state: userState } = useContext(UserContext);

    const handleSubmit = () => {
        if (title.trim() && description.trim()) {
            todoDispatch({
                type: 'CREATE_TODO',
                payload: {
                    title: title,
                    description: description,
                    author: userState.user,
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
                value={userState.user}
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
