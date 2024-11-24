import React from "react";
import LoginForm from "../Components/LoginForm";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css"
const LoginPage: React.FC = () => {
    const navigate = useNavigate();
  
    const handleRegisterRedirect = () => {
      navigate("/register");
    };
  
    return (
      <div className="login-page">
        <h1>Login</h1>
        <LoginForm />
        <div className="register-button">
          <button onClick={handleRegisterRedirect}>Register</button>
        </div>
      </div>
    );
  };
  
  export default LoginPage;