import React, { useState, useContext, useEffect } from "react";
import { StateContext } from "../context";
import { useResource } from "react-request-hook";

// Component for new user registration
export default function Register() {
  // State hooks for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  // Accessing global state
  const { dispatch } = useContext(StateContext);

  // Resource hook for registration
  const [user, register] = useResource((user, pwd) => ({
    url: "/users",
    method: "post",
    data: { email: user, password: pwd },
  }));

  // Effect hook for successful registration
  useEffect(() => {
    if (user?.data) {
      dispatch({ type: "REGISTER", username: user.data.email });
    }
  }, [user, dispatch]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Input validation for email format and password matching
    if (!/\S+@\S+\.\S+/.test(username)) {
      alert("Invalid email format");
      return;
    }
    if (password !== passwordRepeat) {
      alert("Passwords do not match");
      return;
    }
    register(username, password);
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
