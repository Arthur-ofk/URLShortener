import { takeLatest, call, put, takeEvery } from "redux-saga/effects";
import {
    FETCH_URLS_REQUEST,
    fetchUrlsSuccess,
    fetchUrlsFailure,
    CREATE_URL_REQUEST,
    createUrlSuccess,
    createUrlFailure,
    DELETE_URL_REQUEST,
    deleteUrlSuccess,
    deleteUrlFailure,
} from "../actions/urlActions";
import { fetchUrls, createUrl, deleteUrl } from "../../Api/urlApi";

function* handleFetchUrls(): Generator<any, void, any> {
    try {
        const response = yield call(fetchUrls);
        console.log(response.data);
        
        yield put(fetchUrlsSuccess(response.data));
    } catch (error: any) {
        yield put(fetchUrlsFailure(error.message));
    }
}

function* handleCreateUrl(action: any): Generator<any, void, any> {
    try {
        const response = yield call(createUrl, action.payload);
        console.log('response in handleCreateUrl',response);
        
        yield put(createUrlSuccess(response.data));
    } catch (error: any) {
        console.log(error.message);
        
        yield put(createUrlFailure(error.message));
    }
}

function* handleDeleteUrl(action: any): Generator<any, void, any> {
    try {
        yield call(deleteUrl, action.id);
        yield put(deleteUrlSuccess(action.id));
    } catch (error: any) {
        yield put(deleteUrlFailure(error.message));
    }
}

export default function* urlSaga() {

    yield takeEvery(FETCH_URLS_REQUEST, handleFetchUrls);
    yield takeEvery(CREATE_URL_REQUEST, handleCreateUrl);
    yield takeEvery(DELETE_URL_REQUEST, handleDeleteUrl);
   

}