import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import postReducer from "./postSlice"
export const store = configureStore({
    reducer: {
        postsReducer,
        postReducer
    }
})