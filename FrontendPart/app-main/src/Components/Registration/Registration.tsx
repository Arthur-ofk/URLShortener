import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationStyles.css";
import { register } from "../../Services/authService";

const Registration = () => {
  const [userNameOrEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register({ userNameOrEmail, password });
      navigate("/");
    } catch (err: any) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={userNameOrEmail}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input"
      />
      <button onClick={handleRegister} className="button">
        Register
      </button>
    </div>
  );
};

export default Registration;
