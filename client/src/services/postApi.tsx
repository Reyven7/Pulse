import { PostData } from "@/models/types/content/post";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5235/api/post/" }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostData[], void>({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
      }),
    }),
    getPostsByUsername: builder.query<PostData[], string>({
      query: (username) => ({
        url: `${username}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostsByUsernameQuery } = postApi;
