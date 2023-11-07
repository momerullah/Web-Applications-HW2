import React, { useContext, useEffect } from 'react';
import { useResource } from 'react-request-hook';
import { StateContext } from './contexts';
import Todo from './Todo';

export default function TodoList() {
  const { state, dispatch } = useContext(StateContext);
  const [todos, getTodos] = useResource(() => ({
    url: '/todos',
    method: 'get'
  }));

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  useEffect(() => {
    if (todos && todos.data) {
      dispatch({ type: 'LOAD_TODOS', payload: todos.data });
    }
  }, [todos, dispatch]);

  return (
    <div id="todo-list">
      {state.todo.todos.map((todo, index) => (
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
