import axios from "axios";
import { UrlPayload } from "../Redux/types/urlTypes";

export const API_URL = process.env.REACT_APP_API_URL || "https://localhost:44369/api/urls";


export const fetchUrls = async () => {
    let userId= localStorage.getItem("userId")
    let jwtToken=localStorage.getItem("jwtToken")
   const response = await axios.get(`${API_URL}/user/${userId}`,{headers:{"Authorization":`Bearer ${jwtToken}`}});
    userId = "";
    jwtToken = "";
   return response
    
}
export const createUrl =async (payload: UrlPayload) =>{
    let jwtToken=localStorage.getItem("jwtToken")
    
    const res = await axios.post(API_URL, payload,{headers:{"Authorization":`Bearer ${jwtToken}`}});

    return res
    
     
}
export const deleteUrl = (id: string) =>{
    let jwtToken=localStorage.getItem("jwtToken")
    axios.delete(`${API_URL}/${id}`,{headers:{"Authorization":`Bearer ${jwtToken}`}});
}
    