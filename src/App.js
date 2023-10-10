import React from 'react';
import './App.css';
import UserBar from './UserBar';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';

function App() {
    return (
        <div className="App">
            <h1>ToDo App</h1>
            <UserBar />
            <CreateTodo />
            <TodoList />
        </div>
    );
}

export default App;
