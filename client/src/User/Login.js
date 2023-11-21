import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../context";
import { useResource } from "react-request-hook";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(StateContext);

  // Updated resource hook for login action to match the backend endpoint and data structure
  const [user, login] = useResource((username, password) => ({
    url: '/auth/login',
    method: 'post',
    data: { username, password },
  }));

  // Effect hook to update state upon successful login
  useEffect(() => {
    if (user?.data) {
      // Assuming you want to store the token and username in your app's state
      dispatch({
        type: "LOGIN",
        username: user.data.username,
        token: user.data.token
      });
      // You might also want to store the token in localStorage
      localStorage.setItem('token', user.data.token);
    }
  }, [user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No need to validate email format here if your usernames are not in email format
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
