import React, { useContext } from 'react';
import { StateContext } from './contexts';

export default function Logout() {
  const { state, dispatch } = useContext(StateContext);

  return (
    <form onSubmit={e => {
      e.preventDefault();
      dispatch({ type: 'LOGOUT' });
    }}>
      Logged in as: <span>{state.user.user}</span>
      <br />
      <input type="submit" value="Logout" />
    </form>
  )
}
