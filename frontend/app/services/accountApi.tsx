import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserProfile } from "@/models/user";
import { LoginInfo } from "../models/user";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5235/api/account/' }),
    endpoints: (builder) => ({
        login: builder.mutation<UserProfile, LoginInfo>({
            query: (loginInfo) => ({
                url: 'login',
                method: 'POST',
                body: loginInfo,
            }),
        }),
    })
})

export const { useLoginMutation } = accountApi