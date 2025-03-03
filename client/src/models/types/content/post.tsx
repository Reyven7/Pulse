import { AuthorInfo } from "@/models/types/user/profile";

export interface PostData {
  id: string;
  content?: string;
  isEdited?: boolean;
  creationDate: string | Date;
  mediaContent: MediaContent[];
  commentsCount?: number;
  likesCount?: number;
  user: AuthorInfo;
}

export interface MediaContent {
  url: string;
  type: string;
}
