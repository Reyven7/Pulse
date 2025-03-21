import { selectUser } from "@/services/accountSlice";
import { useCreatePostMutation } from "@/services/postApi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, MapPin, SmilePlus } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";

export default function PostCreator() {
  const { username } = useParams<{ username: string }>();
  const user = useSelector(selectUser);

  const [createPost] = useCreatePostMutation();

  if (!user || username !== user.username) {
    return null;
  }

  const handlePostCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await createPost({
        content: formData.get("content") as string,
        mediaContent: [],
        userId: user.id,
      }).unwrap();
    } catch (err) {
      console.error("Post create failed:", err);
    }
  };

  return (
    <div className="rounded-lg p-4 border">
      <div className="mb-4 flex gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={
              user.profilePictureUrl ??
              "https://i.pinimg.com/736x/b5/95/c1/b595c1bcbbccf300ea05a2e435d91cc3.jpg"
            }
            alt={user.username}
          />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>

        <form onSubmit={handlePostCreate} className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Write something..."
            className="w-full bg-transparent placeholder:text-slate-500 focus:outline-none border-b border-gray-300 p-2"
            name="content"
            required
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                <Users className="mr-2 h-4 w-4" />
                People
              </Button>
              <Button variant="ghost" size="sm">
                <MapPin className="mr-2 h-4 w-4" />
                Check in
              </Button>
              <Button variant="ghost" size="sm">
                <SmilePlus className="mr-2 h-4 w-4" />
                Mood
              </Button>
            </div>
            <Button type="submit">Share</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
