import axios from "axios";
import { API_BASE_URL } from "./endpoints";
import { UserWithToken } from "../Store/User/types";

export const login = async (credentials: { userNameOrEmail: string; password: string }):Promise<UserWithToken> => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return response.data
};

export const register = async (credentials: { userNameOrEmail: string; password: string }) => {
  await axios.post(`${API_BASE_URL}/auth/register`, credentials);
};

export const logout = () => {
  localStorage.removeItem("token");
};
