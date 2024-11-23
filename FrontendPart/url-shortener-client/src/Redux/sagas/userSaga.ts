
import { call, put, takeLatest } from "redux-saga/effects";
import {   updateUser, deleteUser } from "../../Api/userApi";
import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, UpdateUserRequestAction, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, DeleteUserRequestAction, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, FETCH_USERS_REQUEST, UPDATE_USER_REQUEST, DELETE_USER_REQUEST } from "../types/userTypes";

/**
 * Функція для отримання списку користувачів.
 */
// function* handleFetchUsers(): Generator<any, void, any> {
//     try {
//         const response = yield call(fetchUsers);
//         yield put({ type: FETCH_USERS_SUCCESS, users: response.data });
//     } catch (error: any) {
//         yield put({ type: FETCH_USERS_FAILURE, error: error.message });
//     }
// }

/**
 * Функція для оновлення користувача.
 */
function* handleUpdateUser(action: UpdateUserRequestAction): Generator<any, void, any> {
    try {
        const response = yield call(updateUser, action.payload);
        yield put({ type: UPDATE_USER_SUCCESS, user: response.data });
    } catch (error: any) {
        yield put({ type: UPDATE_USER_FAILURE, error: error.message });
    }
}

/**
 * Функція для видалення користувача.
 */
function* handleDeleteUser(action: DeleteUserRequestAction): Generator<any, void, any> {
    try {
        yield call(deleteUser, action.id);
        yield put({ type: DELETE_USER_SUCCESS, id: action.id });
    } catch (error: any) {
        yield put({ type: DELETE_USER_FAILURE, error: error.message });
    }
}

/**
 * Сага для обробки всіх дій, пов'язаних з користувачами.
 */
export default function* userSaga() {
    // yield takeLatest(FETCH_USERS_REQUEST, handleFetchUsers);
    yield takeLatest(UPDATE_USER_REQUEST, handleUpdateUser);
    yield takeLatest(DELETE_USER_REQUEST, handleDeleteUser);
}