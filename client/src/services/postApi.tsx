import { CreatePostData, PostData } from "@/models/types/content/post";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5235/api/post/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<PostData[], void>({
      query: () => ({
        url: "",
        method: "GET",
        credentials: "include",
        providesTags: ["Post"],
      }),
    }),
    getPostsByUsername: builder.query<PostData[], string>({
      query: (username) => ({
        url: `${username}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    createPost: builder.mutation<void, CreatePostData>({
      query: (creationDate) => ({
        url: "",
        method: "POST",
        body: creationDate,
        credentials: "include",
        invalidatesTags: [{ type: "Post", id: "LIST" }],
      }),
    }),
    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `${postId}`,
        method: "DELETE",
        credentials: "include",
        invalidatesTags: [{ type: "Post", id: "LIST" }],
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUsernameQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;
