import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./stores/apiSlice";
import userReducer from "./stores/userStore";

const store = configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});

export default store