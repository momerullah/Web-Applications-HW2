import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../context";
import { useResource } from "react-request-hook";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const { dispatch } = useContext(StateContext);

  // Resource hook for registration
  // Updated to match the backend API endpoint and data structure
  const [user, register] = useResource(({ username, password, passwordRepeat }) => ({
    url: '/auth/register',
    method: 'post',
    data: { username, password, passwordConfirmation: passwordRepeat }
  }));

  // Effect hook for successful registration
  useEffect(() => {
    if (user?.data) {
      // Handle the response data as per your backend's response structure
      dispatch({ type: 'REGISTER', username: user.data.username });
    }
  }, [user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(username)) {
      alert("Invalid email format");
      return;
    }
    if (password !== passwordRepeat) {
      alert("Passwords do not match");
      return;
    }
    // Call the register function with the username, password, and passwordRepeat
    register({ username, password, passwordRepeat });
  };

  // JSX for the registration form
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Register</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Form fields for registration */}
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name="register-username"
                    id="register-username"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="register-password"
                    id="register-password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                    name="register-password-repeat"
                    id="register-password-repeat"
                    placeholder="Repeat Password"
                  />
                </div>
                <input type="submit" className="btn btn-success" value="Register" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
