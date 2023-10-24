import React, { useReducer } from 'react';
import './App.css';
import UserBar from './UserBar';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
import { UserContext, userReducer, userInitialState } from './context/UserContext';
import { TodoContext, todoReducer, todoInitialState } from './context/TodoContext';

function App() {
    const [userState, userDispatch] = useReducer(userReducer, userInitialState);
    const [todoState, todoDispatch] = useReducer(todoReducer, todoInitialState);

    return (
        <UserContext.Provider value={{ state: userState, dispatch: userDispatch }}>
            <TodoContext.Provider value={{ state: todoState, dispatch: todoDispatch }}>
                <div className="App">
                    <h1>ToDo App</h1>
                    <UserBar />
                    {userState.isLoggedIn && <CreateTodo />}
                    <TodoList />
                </div>
            </TodoContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
