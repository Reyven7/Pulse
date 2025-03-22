import { AuthorInfo } from "../user/profile";

export interface CommentData {
  id: string;
  content: string;
  user: AuthorInfo;
  creationDate: string;
}

export interface CreateCommentData {
  userId: string;
  postId: string;
  content: string;
}
