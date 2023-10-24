import React, { useContext } from 'react';
import { TodoContext } from './context/TodoContext';
import Todo from './Todo';

export default function TodoList() {
    const { state } = useContext(TodoContext);
    const todos = state.todos;

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
