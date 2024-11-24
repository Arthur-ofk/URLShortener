import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import urlSaga from "./urlSaga";
import userSaga from "./userSaga";

export default function* rootSaga(){
    yield all([
        authSaga(),  
        urlSaga(),   
        userSaga(),  
    ]);
}