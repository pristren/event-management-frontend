import { store } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";
// Check local storage for user data on app init

const storedUserData = localStorage.getItem("authUser");

if (storedUserData) {
  const parsedUserData = JSON.parse(storedUserData);
  // Dispatch an action to update the user state with data from local storage
  store.dispatch(userLoggedIn(parsedUserData));
} else {
  // If no user data is found in local storage, dispatch an action to log the user out
  store.dispatch(userLoggedOut());
}
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
      }),
      // if i want to get the callback response here then
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
              // user: result.data.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
        } catch (error) {
          // do nothing
        }
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      // if i want to get the callback response here then meaning after fetch if i want .then()
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
              // user: result.data.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
        } catch (error) {
          // do nothing
        }
      },
    }),
    getUserInfo: builder.query({
      query: () => `user/userInfo`,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserInfoQuery } =
  authApi;
