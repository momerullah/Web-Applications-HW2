import React, { useContext } from 'react';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import { StateContext } from './contexts'; // Import StateContext

export default function UserBar() {
  const { state } = useContext(StateContext); // Use StateContext

  if (state.user.isLoggedIn) {
    return <Logout />;
  } else {
    return (
      <div>
        <Login />
        <Register />
      </div>
    );
  }
}
