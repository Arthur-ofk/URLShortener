import { GET_USER_FAILURE, GET_USER_SUCCESS, REMOVE_USER, SET_USER } from "./constants";
import { UserWithToken } from "./types";


interface UserState{
    userWithToken: UserWithToken|null;
    userError:string|null
}
const initialState : UserState={
    
    userWithToken:null,
    userError:null

}
const userReducer =(state = initialState,action:any):UserState=>{
  switch(action.type)
  {
   case SET_USER:
    return{
        ...state,
        userWithToken: action.payload,
        userError:null
     }
    case GET_USER_SUCCESS:
       return{
            ...state,
            userError:null
        }
    case GET_USER_FAILURE:
        return{
        ...state,userError:action.payload
        }
    case REMOVE_USER:
        return{
            ...state,userWithToken:null,userError:null
        }
     default :{
        return state
     }
  }
}
export default userReducer;