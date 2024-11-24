export interface User {
    id: string;
    email: string;
    role?: string; // Роль (наприклад, "Admin" або "User")
}

/**
 * UpdateUserPayload - інтерфейс для оновлення даних користувача.
 */
export interface UpdateUserPayload {
    id: string;
    email?: string;
    password?: string;
    role?: string;
}

/**
 * UserState - стан редюсера користувачів.
 */
export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

/**
 * Константи екшенів для роботи з користувачами.
 */
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

/**
 * Інтерфейси для екшенів роботи з користувачами.
 */
export interface FetchUsersRequestAction {
    type: typeof FETCH_USERS_REQUEST;
}

export interface FetchUsersSuccessAction {
    type: typeof FETCH_USERS_SUCCESS;
    users: User[];
}

export interface FetchUsersFailureAction {
    type: typeof FETCH_USERS_FAILURE;
    error: string;
}

export interface UpdateUserRequestAction {
    type: typeof UPDATE_USER_REQUEST;
    payload: UpdateUserPayload;
}

export interface UpdateUserSuccessAction {
    type: typeof UPDATE_USER_SUCCESS;
    user: User;
}

export interface UpdateUserFailureAction {
    type: typeof UPDATE_USER_FAILURE;
    error: string;
}

export interface DeleteUserRequestAction {
    type: typeof DELETE_USER_REQUEST;
    id: string;
}

export interface DeleteUserSuccessAction {
    type: typeof DELETE_USER_SUCCESS;
    id: string;
}

export interface DeleteUserFailureAction {
    type: typeof DELETE_USER_FAILURE;
    error: string;
}

/**
 * Об'єднання типів екшенів.
 */
export type UserAction =
    | FetchUsersRequestAction
    | FetchUsersSuccessAction
    | FetchUsersFailureAction
    | UpdateUserRequestAction
    | UpdateUserSuccessAction
    | UpdateUserFailureAction
    | DeleteUserRequestAction
    | DeleteUserSuccessAction
    | DeleteUserFailureAction;