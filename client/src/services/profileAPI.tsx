import { UserProfile } from "@/models/types/user/profile";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5235/api/profile/" }),
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, string>({
      query: (username) => ({
        url: `${username}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
