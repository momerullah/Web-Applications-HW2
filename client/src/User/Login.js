import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../context";
import { useResource } from "react-request-hook";

// Component for handling user login
export default function Login() {
  // State hooks for managing form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Accessing the global state
  const { dispatch } = useContext(StateContext);

  // Resource hook for login action
  const [user, login] = useResource((user, pwd) => ({
    url: "/login",
    method: "post",
    data: { email: user, password: pwd },
  }));

  // Effect hook to handle user state changes
  useEffect(() => {
    if (user?.data?.user) {
      dispatch({ type: "LOGIN", username: user.data.user.email });
    }
  }, [user, dispatch]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic email format validation
    if (!/\S+@\S+\.\S+/.test(username)) {
      alert("Invalid email format");
      return;
    }
    login(username, password);
  };

  // JSX for rendering the login form
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name="login-username"
                    id="login-username"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="login-password"
                    id="login-password"
                    placeholder="Password"
                  />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
