import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, LOGIN_REQUEST, loginRequest } from "../Redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Redux/store";
import "../Styles/LoginForm.css";
import { fetchUrlsRequest } from "../Redux/actions/urlActions";


const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const [userNameOrEmail, setUserNameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const { isAuthenticated,statusMessage,error } = useSelector((state: RootState) => state.auth);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       
        dispatch(loginRequest({ userNameOrEmail, password }));
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError()); 
            }, 3000); 

            return () => clearTimeout(timer); 
        }
    }, [error, dispatch]);
    useEffect(() => {
        
        if (isAuthenticated) {
          navigate("/dashboard");
        }
      }, [isAuthenticated, navigate]);

    return (<div className="login-form">
        <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
            type="email"
            value={userNameOrEmail}
            onChange={(e) => setUserNameOrEmail(e.target.value)}
            required
        />
        <label>Password:</label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <button type="submit" > Login</button>
    </form>
    {statusMessage && (
    <div className={`message ${error ? "error" : "success"}`}>
        {statusMessage}
    </div>
    )}
    </div>
        
    );
};

export default LoginForm;