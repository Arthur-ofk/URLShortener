import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    
    LOGOUT_SUCCESS,
} from "../actions/authActions";
import { AuthState } from "../types/authTypes";

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
};

export default function authReducer(state = initialState, action: any): AuthState {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            return { ...state, error: null };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return { isAuthenticated: true, user: action.user, error: null };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return { ...state, error: action.error };
            case LOGOUT_SUCCESS:
                return {
                  ...state,
                  isAuthenticated: false,
                  user: null,
                };
        default:
            return state;
    }
}