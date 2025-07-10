import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5500/api/auth/login", {
        email,
        password,
      });

      if (response.data) {
        // Store Token & Username
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username); // Store username

        // Redirect to Dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid Credentials");
    }
  };

  return (
    <>
      <div className="login-page bg-body-secondary">
        <div className="login-box">
          <div className="login-logo">
            <Link to="/">
              <b>Admin</b>Panel
            </Link>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              <form onSubmit={handleLogin}>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="input-group-text">
                    <span className="bi bi-envelope"></span>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="input-group-text">
                    <span className="bi bi-lock-fill"></span>
                  </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                  <div className="col-12">
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
