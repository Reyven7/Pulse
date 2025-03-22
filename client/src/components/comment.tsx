import { CommentData } from "@/models/types/content/comment";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { uk } from "date-fns/locale";
import { Verified } from "lucide-react";

const Comment = ({ comment }: { comment: CommentData }) => {
  const timeAgo = formatDistanceToNow(new Date(comment.creationDate), {
    addSuffix: true,
    locale: uk,
  });

  return (
    <div className="flex gap-3 p-4 border-b border-zinc-800">
      <Avatar className="w-10 h-10 border-2 border-zinc-700 shadow-md">
        <AvatarImage
          src={comment.user.profilePictureUrl}
          alt={comment.user.username}
        />
        <AvatarFallback className="bg-zinc-900 text-zinc-300 font-bold">
          {comment.user.username[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <p className="font-semibold text-white">{comment.user.username}</p>
          {comment.user.isVerified && (
            <Verified className="h-4 w-4 text-zinc-400" />
          )}
        </div>
        <p className="text-sm text-zinc-300 mt-1">{comment.content}</p>
        <p className="text-xs text-zinc-500 mt-1">{timeAgo}</p>
      </div>
    </div>
  );
};

export default Comment;
