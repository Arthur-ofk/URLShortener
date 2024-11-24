import axios from "axios";
import { UrlPayload } from "../Redux/types/urlTypes";

export const API_URL = process.env.REACT_APP_API_URL || "https://localhost:44369/api/urls";

const userId= localStorage.getItem("userId")
const jwtToken=localStorage.getItem("jwtToken")
export const fetchUrls = async () => {
    
    console.log("user id in fetch urls",userId);
    
   const response = await axios.get(`${API_URL}/user/${userId}`,{headers:{"Authorization":`Bearer ${jwtToken}`}});
   console.log(response.data)
   return response
    
}
export const createUrl =async (payload: UrlPayload) =>{
    console.log("payload in createUrl: ",payload);
    
    const res = await axios.post(API_URL, payload,{headers:{"Authorization":`Bearer ${jwtToken}`}});
    return res
    
     
}
export const deleteUrl = (id: string) =>
    axios.delete(`${API_URL}/${id}`,{headers:{"Authorization":`Bearer ${jwtToken}`}});