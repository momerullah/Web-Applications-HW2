import React, { useContext } from 'react';
import { UserContext } from './context/UserContext';

export default function Logout() {
    const { state, dispatch } = useContext(UserContext);

    return (
        <form onSubmit={e => {
            e.preventDefault();
            dispatch({ type: 'LOGOUT' });
        }}>
            Logged in as: <span>{state.user}</span>
            <br />
            <input type="submit" value="Logout" />
        </form>
    )
}
