import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { UserProfile } from "@/models/user";
import { NavLink } from "react-router-dom";

export const ProfileHeader = ({ profile }: { profile: UserProfile }) => {
  const tabs = [
    { name: "Timeline", href: `/profile/${profile.username}` },
    { name: "About", href: `/profile/${profile.username}/about` },
    { name: "Friends", href: `/profile/${profile.username}/friends` },
    { name: "Photos", href: `/profile/${profile.username}/photos` },
    { name: "More", href: `/profile/${profile.username}/more` },
  ];

  return (
    <div className="relative">
      <div className="h-60 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600" />

      <div className="container relative px-6">
        <div className="absolute -bottom-10 flex items-center gap-4">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage
              src={profile.profilePictureUrl}
              alt="Profile picture"
            />
            <AvatarFallback>
              {profile.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="mb-4 text-white">
            <h1 className="text-3xl font-bold">{profile.username}</h1>
          </div>
        </div>
      </div>

      <div className="container border-b flex justify-center">
        <nav className="-mb-px flex space-x-8" aria-label="Profile navigation">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.href}
              end
              className={({ isActive }) =>
                cn(
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground",
                  "border-b-2 py-4 px-1 text-sm font-medium"
                )
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ProfileHeader;
