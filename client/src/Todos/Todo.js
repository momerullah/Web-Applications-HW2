// Import necessary hooks and context
import { useState, useContext } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../context";

// Functional component for displaying individual todos
export default function Todo({
  title,
  description,
  author,
  dateCreated,
  complete,
  dateCompleted,
  id,
}) {
  const { dispatch } = useContext(StateContext);
  const [isComplete, setComplete] = useState(complete);

// Resource hooks for updating and deleting todos
const [, performUpdateTodo] = useResource((todo) => ({
  url: `/toDo/toggle/${todo.id}`, 
  method: 'patch',
  headers: {
    Authorization: localStorage.getItem('token')
  },
  data: { complete: todo.complete }, // Send only the fields that are being updated
}));

const [, performDeleteTodo] = useResource((id) => ({
  url: `/toDo/delete/${id}`, 
  method: 'delete', 
  headers: {
    Authorization: localStorage.getItem('token')
  },
}));

  // Handler for toggling the completion status of a todo
  const handleCompletionToggle = () => {
    const updatedTodo = {
      id,
      title,
      description,
      author,
      dateCreated,
      complete: !isComplete,
      dateCompleted: !isComplete ? new Date().toISOString() : null,
    };

    performUpdateTodo(updatedTodo);
    setComplete(!isComplete);
    dispatch({ type: "TOGGLE_TODO", todo: updatedTodo });
  };

  // Handler for deleting a todo
  const handleDeletion = () => {
    performDeleteTodo(id);
    dispatch({ type: "DELETE_TODO", id });
  };

  // Render the todo card
  return (
    <article className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <footer className="blockquote-footer">
          Written by <cite title="Source Title">{author}</cite>
        </footer>
        <p className="card-text">
          <small className="text-muted">Created on: {new Date(dateCreated).toLocaleString()}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">
            {isComplete ? `Completed on: ${new Date(dateCompleted).toLocaleString()}` : "Not completed"}
          </small>
        </p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isComplete}
            onChange={handleCompletionToggle}
            id={`todo-complete-${id}`}
          />
          <label className="form-check-label" htmlFor={`todo-complete-${id}`}>
            Complete
          </label>
        </div>
        <button className="btn btn-danger" onClick={handleDeletion}>Delete</button>
      </div>
    </article>
  );
}
