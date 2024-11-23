import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginStyles.css";
import { login } from "../../Services/authService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { setUser } from "../../Store/User/actions";

const Login = () => {
  const [userNameOrEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      var user = await login({ userNameOrEmail, password });
     
        dispatch(setUser(user));
      
      navigate("/table");
    } catch (err: any) {
      setError("Invalid credentials. Please try again."+ err);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
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
      <button onClick={handleLogin} className="button">
        Login
      </button>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
