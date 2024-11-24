import axios from "axios";
import { UpdateUserPayload } from "../Redux/types/userTypes";

const API_URL = process.env.REACT_APP_API_URL || "https://localhost:44369/api/users";

export const updateUser = (payload: UpdateUserPayload) =>
    axios.put(`${API_URL}/${payload.id}`, payload);

export const deleteUser = (id: string) =>
    axios.delete(`${API_URL}/${id}`);