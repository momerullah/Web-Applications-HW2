import React, { useContext } from "react";
import { StateContext } from "../context";

// Component for user logout
export default function Logout() {
  const { state, dispatch } = useContext(StateContext);

  // Logout handler
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  };

  // JSX for the logout button
  return (
    <form onSubmit={handleLogout}>
      <span>Logged in as: <b>{state.user}</b></span>
      <input type="submit" value="Logout" />
    </form>
  );
}
