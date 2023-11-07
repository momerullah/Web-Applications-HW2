export const todoInitialState = {
    todos: []
};

export function todoReducer(state, action) {
    switch (action.type) {
        case 'FETCH_TODOS':
            return {
                ...state,
                todos: action.payload
            };
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            };
        // ... other cases
        default:
            return state;
    }
}
