import React, { useContext } from 'react';
import { StateContext } from './contexts'; // Import the combined StateContext
import Todo from './Todo';

export default function TodoList() {
    const { state } = useContext(StateContext); // Use the combined context
    const todos = state.todo.todos; // Access the todos from the combined state

    return (
        <div id="todo-list">
            {todos.map((todo, index) => (
                <Todo 
                    key={index}
                    title={todo.title}
                    description={todo.description}
                    author={todo.author}
                    dateCreated={todo.dateCreated}
                    complete={todo.complete}
                    dateCompleted={todo.dateCompleted}
                />
            ))}
        </div>
    );
}
