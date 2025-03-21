import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Trash,
  Verified,
} from "lucide-react";
import { PostData } from "@/models/types/content/post";
import { Link } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectUser } from "@/services/accountSlice";
import { useSelector } from "react-redux";
import { useDeletePostMutation, useGetPostsQuery } from "@/services/postApi";
import {
  useGetLikeStatusMutation,
  useSetLikeMutation,
} from "@/services/likeApi";

const Post = React.memo(({ postData }: { postData: PostData }) => {
  const [deletePost] = useDeletePostMutation();
  const [setLike] = useSetLikeMutation();
  const [getLikeStatus] = useGetLikeStatusMutation();
  const { refetch } = useGetPostsQuery();
  const [likeStatus, setLikeStatus] = useState(false);
  const user = useSelector(selectUser);
  const profileImageUrl = useMemo(
    () =>
      postData.user.profilePictureUrl ??
      "https://i.pinimg.com/736x/b5/95/c1/b595c1bcbbccf300ea05a2e435d91cc3.jpg",
    [postData.user.profilePictureUrl]
  );

  const handleDelete = async () => {
    try {
      await deletePost(postData.id).unwrap();
      refetch();
    } catch (error) {
      console.error("Post delete failed:", error);
    }
  };

  const handleLike = async () => {
    try {
      await setLike(postData.id).unwrap();
      setLikeStatus((prevStatus) => !prevStatus);
      refetch();
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const status = await getLikeStatus(postData.id).unwrap();
        setLikeStatus(status);
      } catch (error) {
        console.error("Failed to get like status:", error);
      }
    };

    checkLikeStatus();
  }, [postData.id, getLikeStatus]);

  return (
    <Card className="w-full sm:w-[590px] shadow-xl rounded-lg border">
      <CardContent className="px-5 h-full flex flex-col">
        {user?.username === postData.user.username && (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer flex items-center gap-2 p-1 rounded-lg hover:bg-sidebar-accent">
                  <MoreHorizontal />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Edit />
                  Редагувати
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-500"
                >
                  <Trash className="text-red-500" /> Видалити
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <Link to={`/profile/${postData.user.username}`}>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={profileImageUrl} alt={postData.user.username} />
              <AvatarFallback>{postData.user.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-white flex items-center gap-1">
                {postData.user.username}
                {postData.user.isVerified && (
                  <Verified className="h-4 w-4 text-gray-100" />
                )}
              </p>
              <p className="text-sm text-gray-400">@{postData.user.username}</p>
            </div>
          </div>
        </Link>

        {postData.content && (
          <p className="mb-4 text-gray-300 flex-grow">{postData.content}</p>
        )}

        {postData.mediaContent?.map(
          (media, index) =>
            media.type === "img" && (
              <div
                key={index}
                className="w-full overflow-hidden rounded-lg mb-4"
              >
                <img
                  src={media.url}
                  alt="Post media"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            )
        )}

        <div className="flex justify-start text-gray-400 text-sm mt-auto gap-4">
          <Button
            variant="ghost"
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors ${
              likeStatus ? "text-red-500" : "text-gray-400"
            } hover:text-red-500`}
          >
            <Heart
              size={20}
              className={`${likeStatus ? "fill-red-500" : ""}`}
            />{" "}
            <span>{postData.likesCount}</span>
          </Button>

          <Button
            variant="ghost"
            className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
          >
            <MessageCircle size={20} />
            <span>{postData.commentsCount}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

export default Post;
