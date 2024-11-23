import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQUEST, loginRequest } from "../Redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Redux/store";


const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const [userNameOrEmail, setUserNameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
   
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // const credentials = { email:email, password:password }
        dispatch(loginRequest({ userNameOrEmail, password }));
    };
    useEffect(() => {
        if (isAuthenticated) {
          navigate("/dashboard");
        }
      }, [isAuthenticated, navigate]);

    return (
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
    );
};

export default LoginForm;