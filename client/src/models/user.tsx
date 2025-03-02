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

export interface UserShortData {
  username: string;
  profilePictureUrl: string;
  email: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthorProfile {
  id: string;
  username: string;
  profilePictureUrl: string;
}
