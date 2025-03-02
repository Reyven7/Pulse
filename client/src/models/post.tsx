import { AuthorProfile } from "./user";

export interface PostData {
  id: string;
  content?: string;
  isEdited?: boolean;
  creationDate: string | Date;
  mediaContent: MediaContent[];
  commentsCount?: number;
  likesCount?: number;
  user: AuthorProfile;
}

export interface MediaContent {
  url: string;
  type: string;
}
