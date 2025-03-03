import { UserBasicInfo } from "@/models/types/user/profile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserAvatar = ({ user }: { user: UserBasicInfo }) => (
  <Avatar className="h-8 w-8 rounded-lg">
    <AvatarImage src={user.profilePictureUrl} alt={user.username} />
    <AvatarFallback className="rounded-lg">
      {user.username?.slice(0, 2).toUpperCase()}
    </AvatarFallback>
  </Avatar>
);

export default UserAvatar;
