import { Url } from "./types";
import {  GET_ALL_URLS_SUCCESS, GET_ALL_URLS_FAILURE,  REMOVE_URLS, ADD_URL_FAILURE,  ADD_URL_SUCCESS, SET_URLS_SUCCESS, SET_URLS_FAILURE, GET_ALL_URLS_REQUEST, ADD_URL_REQUEST } from "./constants";
import { Dispatch } from "react";
import { addUrl, fetchAllUrlsByUserId } from "../../Services/urlService";


export const getAllUrlsRequest = () => ({
  type: GET_ALL_URLS_REQUEST,
});
export const getAllUrlsSuccess = (urls: Url[]) => ({
  type: GET_ALL_URLS_SUCCESS,
  payload: urls,
  
});
export const addUrlRequest = () => ({
  type: ADD_URL_REQUEST,
});
export const addUrlSuccess = (url: Url) => ({
  type: ADD_URL_SUCCESS,
  payload: url,
});

export const addUrlFailure = (error: string) => ({
  type: ADD_URL_FAILURE,
  payload: error,
});
export const getAllUrlsFailure = (error: string) => ({
  type: GET_ALL_URLS_FAILURE,
  payload: error
});

export const setUrlsSuccess= (urls: Url[])=>
({
  type :SET_URLS_SUCCESS,
  payload:urls
})
export const setUrlFailure=(error: string)=>
({
  type: SET_URLS_FAILURE,
  payload:error
})
export const removeUrls=()=>
({
  type:REMOVE_URLS
})

export const createUrl = (originalUrl: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(addUrlRequest());
    try {
      const url = await addUrl(originalUrl);
      dispatch(addUrlSuccess(url));
    } catch (error: any) {
      dispatch(addUrlFailure(error.message || 'Failed to add URL'));
    }
  };
}
export const fetchUrlsByUserId = (userId: string) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(getAllUrlsRequest());
    try {
      const urls = await fetchAllUrlsByUserId(userId);
      dispatch(getAllUrlsSuccess(urls));
    } catch (error: any) {
      dispatch(getAllUrlsFailure(error.message || 'Failed to fetch URLs'));
    }
  };
}