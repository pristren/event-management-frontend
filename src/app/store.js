import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import layoutSlice from "../features/layout/layoutSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    layout: layoutSlice,
    auth: authSlice,
  },
  devTools: import.meta.env.MODE !== "production",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware);
  },
});
