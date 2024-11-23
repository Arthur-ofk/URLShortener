import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../Redux/actions/authActions";
import { RootState } from "../Redux/store";

const RegistrationForm: React.FC = () => {
    const dispatch = useDispatch();
    const { error} = useSelector((state: RootState) => state.auth);
  
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      dispatch(registerRequest({ userName, email, phoneNumber, password }));
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    );
  };
export default RegistrationForm;