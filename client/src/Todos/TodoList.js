// Import necessary hooks and context
import { useContext } from "react";
import Todo from "./Todo";
import { StateContext } from "../context";

// Component to render a list of Todo components
export default function TodoList() {
  // Retrieve todos from global state
  const { state } = useContext(StateContext);
  const { todos } = state;

  // Render the list of todos, passing necessary props to each Todo component
  return (
    <section>
      <h2>Tasks</h2>
      {todos.length > 0 ? (
        todos.map((todo) => <Todo key={todo.id} {...todo} />)
      ) : (
        <p>No tasks to display. Add a task above.</p>
      )}
    </section>
  );
}
