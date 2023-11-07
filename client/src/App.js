import React, { useReducer, useMemo } from 'react';
import './App.css';
import UserBar from './UserBar';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
import { StateContext } from './contexts'; // Import StateContext
import { userReducer, userInitialState } from './context/UserContext';
import { todoReducer, todoInitialState } from './context/TodoContext';

// Combined initial state
const initialState = {
  user: userInitialState,
  todo: todoInitialState,
};

// Combined reducer function
function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todo: todoReducer(state.todo, action),
  };
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <StateContext.Provider value={contextValue}>
      <div className="App">
        <h1>ToDo App</h1>
        <UserBar />
        {state.user.isLoggedIn && <CreateTodo />}
        <TodoList />
      </div>
    </StateContext.Provider>
  );
}

export default App;
