import React, { useReducer, useMemo, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import './App.css';
import UserBar from './UserBar';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
import { StateContext } from './contexts';
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
  const [todosResponse, getTodos] = useResource(() => ({
    url: '/todos',
    method: 'get'
  }));

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  useEffect(() => {
    if (todosResponse && todosResponse.data) {
      dispatch({ type: 'FETCH_TODOS', payload: todosResponse.data });
    }
  }, [todosResponse]);

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
