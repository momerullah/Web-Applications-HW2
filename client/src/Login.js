import React, { useState, useContext } from 'react';
import { StateContext } from './contexts';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useContext(StateContext);

  const handleSubmit = () => {
    dispatch({ type: 'LOGIN', payload: username });
  };

  return (
    <form onSubmit={e => {
      e.preventDefault();
      handleSubmit();
    }}>
      <label htmlFor="login-username">Username:</label>
      <input 
        type="text"
        name="login-username"
        id="login-username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor="login-password">Password:</label>
      <input 
        type="password"
        name="login-password"
        id="login-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input type="submit" value="Login" />
    </form>
  )
}
