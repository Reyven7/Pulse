import { UserBasicInfo } from "@/models/types/user/profile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserAvatar = ({ user }: { user: UserBasicInfo }) => (
  <Avatar className="w-10 h-10 border-2 border-zinc-700 shadow-md">
    <AvatarImage src={user.profilePictureUrl} alt={user.username} />
    <AvatarFallback className="bg-zinc-900 text-zinc-300 font-bold">
      {user.username[0].toUpperCase()}
    </AvatarFallback>
  </Avatar>
);

export default UserAvatar;
