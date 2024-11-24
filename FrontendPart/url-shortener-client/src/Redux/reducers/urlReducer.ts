import {
    FETCH_URLS_REQUEST,
    FETCH_URLS_SUCCESS,
    FETCH_URLS_FAILURE,
    CREATE_URL_REQUEST,
    CREATE_URL_SUCCESS,
    CREATE_URL_FAILURE,
    DELETE_URL_REQUEST,
    DELETE_URL_SUCCESS,
    DELETE_URL_FAILURE,
} from "../actions/urlActions";
import { UrlState } from "../types/urlTypes";

const initialState: UrlState = {
    urls: [],
    loading: false,
    error: null,
};

export default function urlReducer(state = initialState, action: any): UrlState {
    switch (action.type) {
        case FETCH_URLS_REQUEST:
        case CREATE_URL_REQUEST:
        case DELETE_URL_REQUEST:
            return { ...state, loading: true };
        case FETCH_URLS_SUCCESS:{
            return { urls: action.urls, loading: false, error: null };
        }
        case CREATE_URL_SUCCESS:
            return { ...state, urls: [...state.urls, action.url], loading: false };
        case DELETE_URL_SUCCESS:
            return {
                ...state,
                urls: state.urls.filter((url) => url.id !== action.id),
                loading: false,
            };
        case FETCH_URLS_FAILURE:
        case CREATE_URL_FAILURE:
        case DELETE_URL_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}