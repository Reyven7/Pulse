import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { UserProfile } from "@/models/types/user/profile";
import { Verified } from "lucide-react";
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
    <div className="container">
      <div
        className={`h-40 sm:h-60 w-full bg-cover bg-center ${
          profile.coverPictureUrl
            ? `bg-[url('${profile.coverPictureUrl}')]`
            : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600"
        }`}
        style={{
          backgroundImage: profile.coverPictureUrl
            ? `url(${profile.coverPictureUrl})`
            : undefined,
        }}
      />

      <div className="relative px-4 sm:px-6">
        <div className="absolute -bottom-10 flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-20 w-20 sm:h-32 sm:w-32 border-4 border-background">
            <AvatarImage
              src={profile.profilePictureUrl}
              alt="Profile picture"
            />
            <AvatarFallback>
              {profile.username?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="mb-4 text-center sm:text-left">
            <h1 className="text-xl sm:text-3xl font-bold flex items-center gap-1">
              {profile.username}
              {profile?.isVerified ? (
                <Verified className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : null}
            </h1>
          </div>
        </div>
      </div>

      <div className="container border-b flex justify-center">
        <nav
          className="-mb-px flex flex-wrap justify-center space-x-2 sm:space-x-8"
          aria-label="Profile navigation"
        >
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
                  "border-b-2 py-2 sm:py-4 px-1 text-sm font-medium whitespace-nowrap"
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
