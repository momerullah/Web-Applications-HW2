import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { StateContext } from "../context";
import { useContext } from "react";

// UserBar component to manage user login, logout, and registration views
export default function UserBar() {
  const { state } = useContext(StateContext);

  // Render either Logout or Login/Register based on user state
  return (
    <>
      {state.user ? (
        <Logout />
      ) : (
        <>
          <Login />
          <Register />
        </>
      )}
    </>
  );
}
