import { createContext } from 'react';

export const TodoContext = createContext();

export const todoInitialState = {
    todos: []
};

export function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if (todo.title === action.payload.title) {
                        if (!todo.complete) {
                            return {
                                ...todo,
                                complete: true,
                                dateCompleted: new Date().toLocaleString()
                            };
                        } else {
                            return {
                                ...todo,
                                complete: false,
                                dateCompleted: null
                            };
                        }
                    }
                    return todo;
                })
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.title !== action.payload.title)
            };
        default:
            return state;
    }
}
