import { useState, useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import { StateContext } from '../context';

// Component for creating new todo items
export default function TodoCreator() {
  // State for input fields
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');

  // Accessing the global state and dispatch function from context
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  
  // Standard ISO format date for todo creation
  const creationDate = new Date().toISOString();

// Resource hook for creating todo items
const [todoResource, createNewTodo] = useResource((todoDetails) => ({
  url: '/toDo', 
  method: 'post',
  headers: {
    // Include the token in the Authorization header
    Authorization: localStorage.getItem('token')
  },
  data: todoDetails,
}));

  // Event handler for form submission
  const handleCreateTodo = (event) => {
    event.preventDefault();
    createNewTodo({
      title: todoTitle,
      description: todoDescription,
      author: user,
      dateCreated: creationDate,
      complete: false,
      dateCompleted: null,
    });
  };

  // Effect to reset form and dispatch action when a new todo is created
  useEffect(() => {
    if (todoResource?.data) {
      console.log('New Todo Created:', todoResource.data);
      dispatch({ type: 'CREATE_TODO', ...todoResource.data });
      setTodoTitle('');
      setTodoDescription('');
    }
  }, [todoResource?.data, dispatch]);

  // Form for new todo creation
  return (
    <form onSubmit={handleCreateTodo}>
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          name="create-title"
          id="create-title"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
      </div>
      <textarea
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      />
      <input type="submit" value="Create" />
    </form>
  );
}
