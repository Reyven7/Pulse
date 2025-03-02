import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterData, UserShortData } from "@/models/user";
import { LoginData } from "../models/user";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5235/api/account/" }),
  endpoints: (builder) => ({
    login: builder.mutation<UserShortData, LoginData>({
      query: (loginInfo) => ({
        url: "login",
        method: "POST",
        body: loginInfo,
        credentials: "include",
      }),
    }),
    register: builder.mutation<UserShortData, RegisterData>({
      query: (registerInfo) => ({
        url: "register",
        method: "POST",
        body: registerInfo,
        credentials: "include",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    checkme: builder.mutation<UserShortData, void>({
      query: () => ({
        url: "checkme",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useCheckmeMutation,
} = accountApi;
