import {
   
    GET_ALL_URLS_SUCCESS,
    GET_ALL_URLS_FAILURE,
    REMOVE_URLS,
    ADD_URL_FAILURE,
    ADD_URL_SUCCESS,
    SET_URLS_SUCCESS,
    SET_URLS_FAILURE,
    GET_ALL_URLS_REQUEST
  } from "./constants";
  import { Url } from "./types";
  
  interface UrlsState {
    urls: Url[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: UrlsState = {
    urls: [],
    loading: false,
    error: null
  };
  
  const urlsReducer = (state = initialState, action: any): UrlsState => {
    switch (action.type) {
      case GET_ALL_URLS_REQUEST:
      // case ADD_URL_REQUEST:
      //   return {
      //     ...state,
      //     loading: true,
      //     error: null,
      //   };
      case GET_ALL_URLS_SUCCESS:
        return {
          ...state,
          urls: action.payload,
          loading: false,
          error: null,
        };
      case GET_ALL_URLS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case ADD_URL_SUCCESS:
        return {
          ...state,
          urls: [...state.urls, action.payload],
          loading: false,
          error: null,
        };
      case ADD_URL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case REMOVE_URLS:
        return {
          urls: [],
          loading: false,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default urlsReducer;
  