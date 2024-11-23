import { takeLatest, call, put, takeEvery, takeLeading } from "redux-saga/effects";
import { LOGIN_REQUEST, loginSuccess, loginFailure, REGISTER_REQUEST, LoginRequestAction, loginRequest,  logoutSuccess, LOGOUT_REQUEST, registerFailure, registerSuccess } from "../actions/authActions";
import { login, logout, register } from "../../Api/authApi";

function* handleLogin(action: LoginRequestAction): Generator<any, void, any> {
    try {
        console.log("handlinglogin",action);
        
        const response = yield call(login, action.payload);
        yield put(loginSuccess(response.data));
    } catch (error: any) {
        yield put(loginFailure(error.message));
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
  yield takeLatest(LOGOUT_REQUEST, handleLogout);
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}