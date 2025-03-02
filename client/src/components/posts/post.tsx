import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { PostData } from "@/models/post";

const Post = ({ postData }: { postData: PostData }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-2xl border ">
      <CardContent className="p-5">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={
                postData.user.profilePictureUrl ??
                "https://i.pinimg.com/736x/b5/95/c1/b595c1bcbbccf300ea05a2e435d91cc3.jpg"
              }
              alt={postData.user.username}
            />
            <AvatarFallback>{postData.user.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-white">{postData.user.username}</p>
            <p className="text-sm text-gray-400">@{postData.user.username}</p>
          </div>
        </div>

        {/* Post Content */}
        {postData.content && (
          <p className="mb-4 text-gray-300">{postData.content}</p>
        )}

        {/* Media Content */}
        {postData.mediaContent?.map((media, index) =>
          media.type === "img" ? (
            <div key={index} className="w-full overflow-hidden rounded-lg">
              <img
                src={media.url}
                alt="Post media"
                className="w-full max-h-80 object-cover rounded-lg"
              />
            </div>
          ) : null
        )}

        {/* Action Buttons */}
        <div className="flex justify-left text-gray-400 text-sm mt-4">
          <Button
            variant="ghost"
            className="flex items-center space-x-2 hover:text-red-500 transition-colors"
          >
            <Heart size={20} />
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
};

export default Post;
