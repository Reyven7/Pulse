"use client";

import ErrorAlert from "@/components/error-alert";
import Loader from "@/components/loader";
import ProfileHeader from "@/components/profile/profile-header";
import { useGetProfileQuery } from "@/services/profileApi";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, UserX } from "lucide-react";

const ProfileLayout = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const {
    data: profile,
    error,
    isLoading,
    refetch,
  } = useGetProfileQuery(username || "", {
    refetchOnMountOrArgChange: true,
    skip: !username,
  });

  // Handle loading state with a better visual
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <Loader />
        <p className="text-muted-foreground mt-4">Loading profile...</p>
      </div>
    );
  }

  // Handle error state with better visual and retry option
  if (error) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center">
            <UserX className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
        <ErrorAlert message="We couldn't load this profile. It may not exist or there was a connection issue." />
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button onClick={() => refetch()} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Handle case where profile is undefined
  if (!profile) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center">
            <UserX className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Profile Not Available</h2>
        <p className="text-muted-foreground mb-6">
          This profile could not be found or is no longer available.
        </p>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10">
      {/* Profile Header */}
      <div className="bg-background shadow-sm mb-6">
        <ProfileHeader profile={profile} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-background rounded-lg shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
