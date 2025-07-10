import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5500/api/auth/register", {
        username,
        email,
        password,
      });

      if (response.data) {
        navigate("/login"); 
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <div className="register-page bg-body-secondary">
        <div className="register-box">
          <div className="register-logo">
            <a href="../index2.html">
              <b>Admin</b>LTE
            </a>
          </div>

          <div className="card">
            <div className="card-body register-card-body">
              <p className="register-box-msg">Register a new membership</p>
              <form onSubmit={handleSignup}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="input-group-text">
                    <span className="bi bi-person"></span>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        Sign Up
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

export default Signup;
