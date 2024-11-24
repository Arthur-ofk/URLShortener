import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import urlReducer from "./urlReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    urls: urlReducer,
   
});

export default rootReducer;