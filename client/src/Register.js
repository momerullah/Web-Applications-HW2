import React, { useState, useContext } from 'react';
import { StateContext } from './contexts';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { dispatch } = useContext(StateContext);

  const handleSubmit = () => {
    if (password === repeatPassword) {
      dispatch({ type: 'REGISTER', payload: username });
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <form onSubmit={e => {
      e.preventDefault();
      handleSubmit();
    }}>
      <label htmlFor="register-username">Username:</label>
      <input 
        type="text"
        name="register-username"
        id="register-username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor="register-password">Password:</label>
      <input 
        type="password"
        name="register-password"
        id="register-password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <label htmlFor="register-repeat-password">Repeat password:</label>
      <input 
        type="password"
        name="register-repeat-password"
        id="register-repeat-password"
        value={repeatPassword}
        onChange={e => setRepeatPassword(e.target.value)}
      />
      <input type="submit" value="Register" />
    </form>
  )
}
