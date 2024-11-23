import axios from "axios";
import { Url } from "./types";
import {API_BASE_URL} from "./endpoints"

export const fetchAllUrls = async (): Promise<Url[]> => {
  const response = await axios.get(`${API_BASE_URL}/urls/`);
  return response.data;
};
export const addUrl = async (originalUrl: string): Promise<Url> => {
  const response = await axios.post(`${API_BASE_URL}/urls/`, { originalUrl});
  return response.data;
};
export const fetchAllUrlsByUserId = async (id: string): Promise<Url[]> => {
  const response = await axios.get(`${API_BASE_URL}/urls/user/${id}`);
  return response.data;
};
