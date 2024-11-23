import { createAction } from "@reduxjs/toolkit";
import { LoginPayload, RegisterPayload, User } from "../types/authTypes";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export interface LoginRequestAction {
    type: typeof LOGIN_REQUEST;
    payload: LoginPayload;
    [key: string]: any;
}

export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    user: User;
}

export interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    error: string;
}

export interface RegisterRequestAction {
    type: typeof REGISTER_REQUEST;
    payload: RegisterPayload;
    [key: string]: any;
}

export interface RegisterSuccessAction {
    type: typeof REGISTER_SUCCESS;
    user: User;
}

export interface RegisterFailureAction {
    type: typeof REGISTER_FAILURE;
    error: string;
}
export const logoutRequest = createAction(LOGOUT_REQUEST);

export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const loginRequest = createAction<{ userNameOrEmail: string; password: string }>("LOGIN_REQUEST");

export const loginSuccess = createAction<{ user: any }>("LOGIN_SUCCESS");

export const loginFailure = createAction<{ error: string }>("LOGIN_FAILURE");

export const registerRequest = (payload: RegisterPayload): RegisterRequestAction => ({
    type: REGISTER_REQUEST,
    payload,
});

export const registerSuccess = (user: User): RegisterSuccessAction => ({
    type: REGISTER_SUCCESS,
    user,
});

export const registerFailure = (error: string): RegisterFailureAction => ({
    type: REGISTER_FAILURE,
    error,
});