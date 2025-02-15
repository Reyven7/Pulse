import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostInfo } from "@/models/post";
import { formatDistanceToNow } from "date-fns";

const Post = ({data}: {data: PostInfo}) => {
  const timeAgo = formatDistanceToNow(new Date(data.creationDate), {
    addSuffix: true,
  });

  return (
    <div className="bg-muted/50 mx-auto h-auto w-full max-w-3xl rounded-xl p-4 shadow-md">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 rounded-lg">
          <AvatarImage
            src={data.authotAvatar}
            alt={data.author}
          />
          <AvatarFallback className="rounded-lg">RN</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{data.author}</p>
          <p className="text-muted-foreground text-sm">@{data.author} • {timeAgo}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-100">Where is the patch?</p>
      <div className="text-muted-foreground mt-4 flex">
        <Button variant="ghost" size="icon" className="hover:text-red-500">
          <Heart className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:text-blue-500">
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:text-green-500">
          <Repeat2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Post;
