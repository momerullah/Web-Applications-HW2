export const userInitialState = {
    user: null,
    isLoggedIn: false
};

export function userReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
        case 'REGISTER':
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isLoggedIn: false
            };
        default:
            return state;
    }
}
