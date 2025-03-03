import { LoginCredentials, RegistrationCredentials } from "@/models/types/auth/credentials";
import { UserBasicInfo } from "@/models/types/user/profile";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5235/api/account/" }),
  endpoints: (builder) => ({
    login: builder.mutation<UserBasicInfo, LoginCredentials>({
      query: (loginInfo) => ({
        url: "login",
        method: "POST",
        body: loginInfo,
        credentials: "include",
      }),
    }),
    register: builder.mutation<UserBasicInfo, RegistrationCredentials>({
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
    checkme: builder.mutation<UserBasicInfo, void>({
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
