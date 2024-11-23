import { GET_ALL_URLS_FAILURE } from "../Url/constants";
import { GET_USER_SUCCESS, REMOVE_USER, SET_USER } from "./constants";
import { UserWithToken } from "./types";

export const setUser =(user:UserWithToken)=>
({
    type:SET_USER,
    payload:user
});
export const getUserSuccess=(user:UserWithToken)=>
({
type:GET_USER_SUCCESS,
payload:user
})
export const getUserFailure=(error:string)=>
(
    {
        type:GET_ALL_URLS_FAILURE,
        payload:error
    }
)
export const removeUser=()=>
({
    type:REMOVE_USER,

})

