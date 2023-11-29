import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken:
    JSON.parse(localStorage.getItem("authUser"))?.accessToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    getUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, getUserInfo } = authSlice.actions;

export default authSlice.reducer;
