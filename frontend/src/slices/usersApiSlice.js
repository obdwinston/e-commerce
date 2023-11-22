import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

// for server requests
export const usersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      // .mutation instead of .query
      query: (data) => ({
        url: `${USERS_URL}/signin`,
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/signout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation, useSignoutMutation } =
  usersSlice;
