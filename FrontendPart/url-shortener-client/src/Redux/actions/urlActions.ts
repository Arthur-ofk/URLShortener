import { Url } from "url";
import { UrlPayload } from "../types/urlTypes";

export const FETCH_URLS_REQUEST = "FETCH_URLS_REQUEST";
export const FETCH_URLS_SUCCESS = "FETCH_URLS_SUCCESS";
export const FETCH_URLS_FAILURE = "FETCH_URLS_FAILURE";

export const CREATE_URL_REQUEST = "CREATE_URL_REQUEST";
export const CREATE_URL_SUCCESS = "CREATE_URL_SUCCESS";
export const CREATE_URL_FAILURE = "CREATE_URL_FAILURE";

export const DELETE_URL_REQUEST = "DELETE_URL_REQUEST";
export const DELETE_URL_SUCCESS = "DELETE_URL_SUCCESS";
export const DELETE_URL_FAILURE = "DELETE_URL_FAILURE";

export interface FetchUrlsRequestAction {
    type: typeof FETCH_URLS_REQUEST;
    [key: string]: any;
}

export interface FetchUrlsSuccessAction {
    type: typeof FETCH_URLS_SUCCESS;
    urls: Url[];
}

export interface FetchUrlsFailureAction {
    type: typeof FETCH_URLS_FAILURE;
    error: string;
}

export interface CreateUrlRequestAction {
    type: typeof CREATE_URL_REQUEST;
    payload: UrlPayload;
    [key: string]: any;
}

export interface CreateUrlSuccessAction {
    type: typeof CREATE_URL_SUCCESS;
    url: Url;
}

export interface CreateUrlFailureAction {
    type: typeof CREATE_URL_FAILURE;
    error: string;
}

export interface DeleteUrlRequestAction {
    type: typeof DELETE_URL_REQUEST;
    id: string;
    [key: string]: any;
}

export interface DeleteUrlSuccessAction {
    type: typeof DELETE_URL_SUCCESS;
    id: string;
}

export interface DeleteUrlFailureAction {
    type: typeof DELETE_URL_FAILURE;
    error: string;
}

export const fetchUrlsRequest = (): FetchUrlsRequestAction => ({
    type: FETCH_URLS_REQUEST,
});

export const fetchUrlsSuccess = (urls: Url[]): FetchUrlsSuccessAction => ({
    type: FETCH_URLS_SUCCESS,
    urls,
});

export const fetchUrlsFailure = (error: string): FetchUrlsFailureAction => ({
    type: FETCH_URLS_FAILURE,
    error,
});

export const createUrlRequest = (payload: UrlPayload): CreateUrlRequestAction => ({
    type: CREATE_URL_REQUEST,
    payload,
    
});

export const createUrlSuccess = (url: Url): CreateUrlSuccessAction => ({
    type: CREATE_URL_SUCCESS,
    url,
});

export const createUrlFailure = (error: string): CreateUrlFailureAction => ({
    type: CREATE_URL_FAILURE,
    error,
});

export const deleteUrlRequest = (id: string): DeleteUrlRequestAction => ({
    type: DELETE_URL_REQUEST,
    id,
});

export const deleteUrlSuccess = (id: string): DeleteUrlSuccessAction => ({
    type: DELETE_URL_SUCCESS,
    id,
});

export const deleteUrlFailure = (error: string): DeleteUrlFailureAction => ({
    type: DELETE_URL_FAILURE,
    error,
});