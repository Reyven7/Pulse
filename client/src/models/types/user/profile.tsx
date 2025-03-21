export interface UserProfile {
  username: string;
  fullName: string;
  bio: string;
  profilePictureUrl: string;
  coverPictureUrl: string;
  location: string;
  dateOfBirth: string;
  postsCount: number;
  likesCount: number;
  commentsCount: number;
  lastActive: string;
  isPrivate: boolean;
  isVerified: boolean;
  themePreference: string;
}

export interface UserBasicInfo {
  id: string;
  username: string;
  profilePictureUrl: string;
  email: string;
  role: string;
}

export interface AuthorInfo {
  id: string;
  username: string;
  profilePictureUrl: string;
  isVerified: boolean;
}
