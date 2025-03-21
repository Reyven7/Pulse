import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5235/api/like/" }),
  endpoints: (builder) => ({
    setLike: builder.mutation<void, string>({
      query: (postId) => ({
        url: `${postId}`,
        method: "POST",
        credentials: "include",
        invalidatesTags: [{ type: "Post", id: "LIST" }],
      }),
    }),
    getLikeStatus: builder.mutation<boolean, string>({
      query: (postId) => ({
        url: `${postId}`,
        method: "GET",
        credentials: "include",
        invalidatesTags: [{ type: "Post", id: "LIST" }],
      }),
    }),
  }),
});

export const { useSetLikeMutation, useGetLikeStatusMutation } = likeApi;
