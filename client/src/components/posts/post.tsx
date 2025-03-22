"use client";

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
  Share2,
  Bookmark,
} from "lucide-react";
import type { PostData } from "@/models/types/content/post";
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
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { uk } from "date-fns/locale";

const Post = React.memo(({ postData }: { postData: PostData }) => {
  const [deletePost] = useDeletePostMutation();
  const [setLike] = useSetLikeMutation();
  const [getLikeStatus] = useGetLikeStatusMutation();
  const { refetch } = useGetPostsQuery();
  const [likeStatus, setLikeStatus] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const user = useSelector(selectUser);
  const profileImageUrl = useMemo(
    () =>
      postData.user.profilePictureUrl ??
      "https://i.pinimg.com/736x/b5/95/c1/b595c1bcbbccf300ea05a2e435d91cc3.jpg",
    [postData.user.profilePictureUrl]
  );

  const timeAgo = useMemo(() => {
    if (!postData.creationDate) return "";
    return formatDistanceToNow(new Date(postData.creationDate), {
      addSuffix: true,
      locale: uk,
    });
  }, [postData.creationDate]);

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="w-full sm:w-[590px] shadow-xl rounded-lg border border-zinc-800 bg-black overflow-hidden">
        <CardContent className="p-0">
          <div className="px-4 flex justify-between items-start">
            <Link
              to={`/profile/${postData.user.username}`}
              className="flex items-center gap-3 group"
            >
              <Avatar className="w-12 h-12 border-2 border-zinc-700 shadow-md">
                <AvatarImage
                  src={profileImageUrl}
                  alt={postData.user.username}
                />
                <AvatarFallback className="bg-zinc-900 text-zinc-300 font-bold">
                  {postData.user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-white group-hover:text-zinc-300 transition-colors">
                    {postData.user.username}
                  </p>
                  {postData.user.isVerified && (
                    <Verified className="h-4 w-4 text-zinc-400" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-zinc-500">
                    @{postData.user.username}
                  </p>
                  <span className="text-xs text-zinc-600">{timeAgo}</span>
                </div>
              </div>
            </Link>

            {user?.username === postData.user.username && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-zinc-900"
                  >
                    <MoreHorizontal className="h-5 w-5 text-zinc-200" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 border-zinc-800"
                >
                  <DropdownMenuItem className="flex items-center gap-2 text-zinc-300 hover:text-white focus:text-white">
                    <Edit className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="flex items-center gap-2 text-zinc-300 hover:text-white focus:text-white"
                  >
                    <Trash className="h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <Link to={`/posts/${postData.id}`} className="block">
            {postData.content && (
              <div className="px-4 py-2">
                <p className="text-zinc-300 leading-relaxed">
                  {postData.content}
                </p>
              </div>
            )}

            {postData.mediaContent?.map(
              (media, index) =>
                media.type === "img" && (
                  <div
                    key={index}
                    className="mt-2 overflow-hidden flex justify-center bg-zinc-900"
                  >
                    <img
                      src={media.url || "/placeholder.svg"}
                      alt="Post media"
                      className="w-full max-w-[500px] h-[500px] object-cover transition-transform duration-500 hover:scale-105 "
                      style={{ aspectRatio: "1/1" }}
                    />
                  </div>
                )
            )}
          </Link>

          <div className="px-4 py-3 border-t border-zinc-900 flex justify-between items-center">
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center gap-2 rounded-full px-3 ${
                  likeStatus
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Heart
                  size={18}
                  className={`${
                    likeStatus ? "fill-white" : ""
                  } transition-all ${
                    isHovered && !likeStatus ? "animate-pulse" : ""
                  }`}
                />
                <span>{postData.likesCount || 0}</span>
              </Button>

              <Link to={`/posts/${postData.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 rounded-full px-3"
                >
                  <MessageCircle size={18} />
                  <span>{postData.commentsCount || 0}</span>
                </Button>
              </Link>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-zinc-500 hover:text-zinc-300"
              >
                <Share2 size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-zinc-500 hover:text-zinc-300"
              >
                <Bookmark size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

export default Post;
