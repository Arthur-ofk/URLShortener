import { configureStore } from "@reduxjs/toolkit";

import urlReducer from "./Url/reducer";
import userReducer from "./User/reducer";



const store = configureStore({
  reducer: {
    urls: urlReducer,
    users:userReducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }),
});



export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
