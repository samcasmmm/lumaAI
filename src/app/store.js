import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import cameraReducer from "./features/camera/cameraSlice";
import { apiSlice } from "./apiSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    camera: cameraReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
