import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,

    LOGOUT_SUCCESS,
    CLEAR_ERROR,
} from "../actions/authActions";
import { AuthState } from "../types/authTypes";

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    error: null,
    statusMessage: null,
};

export default function authReducer(state = initialState, action: any): AuthState {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, error: null, statusMessage: null };
        case REGISTER_REQUEST:
            return { ...state, error: null, statusMessage: null };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.user,
                error: null,
                statusMessage: null,
            };
        case REGISTER_SUCCESS:
            return { isAuthenticated: true, user: action.user, error: null, statusMessage: "Реєстрація успішна" };
        
        case LOGIN_FAILURE:
            console.log(action.payload);
            return {
                
                ...state,
                error: action.payload,
                statusMessage: "Login failed:" + action.payload,
            };

        case REGISTER_FAILURE:
            return { ...state, error: action.error };
        case LOGOUT_SUCCESS:
            return {
                isAuthenticated: false,
                user: null,
                error: null,
                statusMessage: null
            };
        case CLEAR_ERROR:
            return { ...state, error: null, statusMessage: null };
        default:
            return state;
    }
}