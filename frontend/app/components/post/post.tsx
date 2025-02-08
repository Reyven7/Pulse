import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Post = () => {
  return (
    <div className="bg-muted/50 mx-auto h-auto w-full max-w-3xl rounded-xl p-4 shadow-md">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 rounded-lg">
          <AvatarImage
            src="https://i.pinimg.com/736x/0f/94/04/0f94048f78aaf19d9cee928d0270c88c.jpg"
            alt="Reyven"
          />
          <AvatarFallback className="rounded-lg">RN</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">Reyven</p>
          <p className="text-muted-foreground text-sm">@reyven • 2h ago</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-100">Valve where patch?</p>
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
