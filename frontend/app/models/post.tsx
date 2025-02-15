export interface PostInfo {
    id: string;
    author: string;
    authotAvatar: string;
    creationDate: string | Date;
    hashtags?: string[];
    text?: string;
    mediaUrls?: string[];
    likes?: number;
    reposts?: number;
    commentsCount?: number;
    isEdited?: boolean;
}
