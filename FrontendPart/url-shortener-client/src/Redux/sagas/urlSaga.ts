import { takeLatest, call, put } from "redux-saga/effects";
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
        yield put(fetchUrlsSuccess(response.data));
    } catch (error: any) {
        yield put(fetchUrlsFailure(error.message));
    }
}

function* handleCreateUrl(action: any): Generator<any, void, any> {
    try {
        const response = yield call(createUrl, action.payload);
        yield put(createUrlSuccess(response.data));
    } catch (error: any) {
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
    yield takeLatest(FETCH_URLS_REQUEST, handleFetchUrls);
    yield takeLatest(CREATE_URL_REQUEST, handleCreateUrl);
    yield takeLatest(DELETE_URL_REQUEST, handleDeleteUrl);
}