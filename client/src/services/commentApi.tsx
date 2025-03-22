import { CommentData, CreateCommentData } from "@/models/types/content/comment";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5235/api/comment/" }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComment: builder.query<CommentData[], string>({
      query: (postId) => ({
        url: `${postId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, postId) =>
        result ? [{ type: "Comment", id: postId }] : [],
    }),
    createComment: builder.mutation<void, CreateCommentData>({
      query: (creationData) => ({
        url: "",
        method: "POST",
        body: creationData,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Comment" }],
    }),
    deleteComment: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `${commentId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, commentId) => [
        { type: "Comment", id: commentId },
      ],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
