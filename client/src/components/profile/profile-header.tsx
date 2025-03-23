import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/models/types/user/profile";
import { selectUser } from "@/services/accountSlice";
import { Camera, Verified } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const ProfileHeader = ({ profile }: { profile: UserProfile }) => {
  const tabs = [
    { name: "Timeline", href: `/profile/${profile.username}` },
    { name: "About", href: `/profile/${profile.username}/about` },
    { name: "Friends", href: `/profile/${profile.username}/friends` },
    { name: "Photos", href: `/profile/${profile.username}/photos` },
    { name: "More", href: `/profile/${profile.username}/more` },
  ];

  const user = useSelector(selectUser);

  return (
    <div className="w-full bg-background">
      {/* Cover Photo Section */}
      <div className="relative">
        <div
          className="h-48 sm:h-64 md:h-80 w-full bg-cover bg-center rounded-b-lg overflow-hidden"
          style={{
            backgroundImage: profile.coverPictureUrl
              ? `url(${profile.coverPictureUrl})`
              : "linear-gradient(to right, rgb(17, 24, 39), rgb(31, 41, 55), rgb(75, 85, 99))",
          }}
        ></div>

        {/* Profile Info Section */}
        <div className="container max-w-none px-4 sm:px-6 relative">
          <div className="flex justify-center">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 sm:-mt-20 mb-6 w-full max-w-7xl">
              {/* Avatar */}
              <Avatar className="h-24 w-24 sm:h-36 sm:w-36 border-4 border-background rounded-full shadow-md">
                <AvatarImage
                  src={profile.profilePictureUrl}
                  alt={`${profile.username}'s profile picture`}
                />
                <AvatarFallback className="text-xl sm:text-3xl">
                  {profile.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Profile Info */}
              <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-end mt-2 sm:mt-0 sm:pb-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-1.5">
                    {profile.fullName || profile.username}
                    {profile?.isVerified && (
                      <Verified className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    )}
                  </h1>
                  {profile.fullName && (
                    <p className="text-muted-foreground">@{profile.username}</p>
                  )}
                  {profile.location && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {profile.location}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                  {user ? (
                    profile.username !== user.username ? (
                      <>
                        <Button size="sm">Follow</Button>
                        <Button variant="outline" size="sm">
                          Message
                        </Button>
                      </>
                    ) : null
                  ) : (
                    <>
                      <NavLink to="/authentication/login">
                        <Button size="sm">Follow</Button>
                      </NavLink>
                      <NavLink to="/authentication/login">
                        <Button variant="outline" size="sm">
                          Message
                        </Button>
                      </NavLink>
                    </>
                  )}

                  {profile.username === user?.username && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="rounded-full"
                    >
                      <Camera className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Edit Cover</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className=" sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="container px-4 sm:px-6">
          <nav
            className="flex justify-center overflow-x-auto scrollbar-hide"
            aria-label="Profile navigation"
          >
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.href}
                end
                className={({ isActive }) =>
                  cn(
                    "px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                    "border-b-2 -mb-px",
                    isActive
                      ? "border-primary text-primary font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                  )
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
