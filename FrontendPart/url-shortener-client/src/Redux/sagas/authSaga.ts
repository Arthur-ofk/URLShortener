import { takeLatest, call, put, takeEvery, takeLeading } from "redux-saga/effects";
import { LOGIN_REQUEST, loginSuccess, loginFailure, REGISTER_REQUEST, LoginRequestAction, loginRequest, logoutSuccess, LOGOUT_REQUEST, registerFailure, registerSuccess } from "../actions/authActions";
import { login, logout, register } from "../../Api/authApi";
import { log } from "console";
import { fetchUrls } from "../../Api/urlApi";

function* handleLogin(action: LoginRequestAction): Generator<any, void, any> {
  try {
    console.log("handlinglogin",action);
    
    const response = yield call(login, action.payload);
    yield put(loginSuccess(response.data));
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
      console.log("Saga: handleLogout started");
      yield call(logout); // Викликаємо функцію logout
      console.log("Saga: logout executed");
      yield put(logoutSuccess()); // Відправляємо екшен успішного виходу
    } catch (error: any) {
      console.error("Logout error in saga:", error.message);
    }
}
function* handleRegister(action: any): Generator<any, void, any> {
  try {
    const response = yield call(register, action.payload);
    yield put(registerSuccess(response.data.message));
    window.alert("Registration successful! Redirecting to login...");
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