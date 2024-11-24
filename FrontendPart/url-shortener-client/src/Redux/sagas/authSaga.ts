import { takeLatest, call, put, takeEvery, takeLeading } from "redux-saga/effects";
import { LOGIN_REQUEST, loginSuccess, loginFailure, REGISTER_REQUEST, LoginRequestAction, loginRequest, logoutSuccess, LOGOUT_REQUEST, registerFailure, registerSuccess } from "../actions/authActions";
import { login, logout, register } from "../../Api/authApi";
import { log } from "console";
import { fetchUrls } from "../../Api/urlApi";
import { fetchUrlsRequest } from "../actions/urlActions";

function* handleLogin(action: LoginRequestAction): Generator<any, void, any> {
  try {
    const response = yield call(login, action.payload);
    yield put(loginSuccess(response.data));
    yield put(fetchUrlsRequest());
} catch (error: any) {
    if (error.response && error.response.status === 400) {

      yield put(loginFailure("Incorrect email or paswword.Try again"));
    } else {
      console.log(error);
      
      yield put(loginFailure("Server is not accessible now,try again later"));
    }
  }
 
}
function* handleLogout(): Generator<any, void, any>{
  try {
      yield call(logout);
      yield put(logoutSuccess());
    } catch (error: any) {
      console.error("Logout error in saga:", error.message);
    }
}
function* handleRegister(action: any): Generator<any, void, any> {
  try {
    const response = yield call(register, action.payload);
    yield put(registerSuccess(response.data.message));
    window.location.href = "/login";
  } catch (error: any) {
    yield put(registerFailure(error.response?.data?.message || "Registration failed"));
  }
}
export default function* authSaga() {

  yield takeLatest(loginRequest.type, handleLogin);
  yield takeEvery(LOGOUT_REQUEST, handleLogout);
  yield takeEvery(REGISTER_REQUEST, handleRegister);
}