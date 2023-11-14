import React, { useContext, useReducer, useEffect } from 'react';
import { ThemeContext, themes } from './themeContext'; 
import CreateTodo from './Todos/CreateTodo';
import TodoList from './Todos/TodoList';
import UserBar from './User/UserBar';
import appReducer from './reducer';
import { StateContext } from './context';
import { useResource } from 'react-request-hook';
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  const [todosResponse, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));

  const { theme, changeTheme } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = React.useState(theme === themes.dark);

  // Fetch todos when component mounts
  useEffect(() => {
    getTodos();
  }, [getTodos]);

  // Update todos in state when response changes
  useEffect(() => {
    if (todosResponse && todosResponse.data) {
      dispatch({ type: "FETCH_TODO", todos: todosResponse.data.reverse() });
    }
  }, [todosResponse]);

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = darkMode ? themes.light : themes.dark;
    setDarkMode(!darkMode);
    changeTheme(newTheme);
    updateBodyClass(newTheme);
  };

  // Update body class based on current theme
  const updateBodyClass = (theme) => {
    const bodyClass = theme === themes.dark ? 'dark-content' : 'white-content';
    document.body.classList.add(bodyClass);
    document.body.classList.remove(bodyClass === 'dark-content' ? 'white-content' : 'dark-content');
  };

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div className={`App ${theme}`}>
        <h1 className="app-main-title">Todo App</h1>
        <button className="toggle-theme" onClick={toggleTheme}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <header className="App-header">
          {/* Additional header content can be added here */}
        </header>
        <div className={state.user ? 'user-bar move-left' : 'user-bar'}>
          <UserBar />
        </div>
        {state.user && <CreateTodo />}
        <div className={state.user ? 'todo-list move-up' : 'todo-list'}>
          <TodoList />
        </div>
      </div>
    </StateContext.Provider>
  );
};

export default App;
