import { LoginPayload, RegisterPayload } from "../Redux/types/authTypes";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://localhost:44369/api";

export const login = async (credentials: LoginPayload) =>{
    const result = await  axios.post(`${API_URL}/auth/login`, credentials);
    localStorage.setItem("jwtToken",result.data.token)
    localStorage.setItem("userId",result.data.user.id)
    return result
}
  
export const logout= ()=>{
     localStorage.removeItem("jwtToken");
     localStorage.removeItem("userId");
}
export const register = (payload: RegisterPayload) => {
    
    const requestBody = {
      ...payload,
      role: payload.role || "User", 
    };
    return axios.post(`${API_URL}/auth/register`, requestBody);
  };
    