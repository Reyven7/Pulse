import ErrorAlert from "@/components/error-alert";
import Loader from "@/components/loader";
import ProfileHeader from "@/components/profile/profile-header";
import { useGetProfileQuery } from "@/services/profileApi";
import { Outlet, useParams } from "react-router-dom";

const ProfileLayout = () => {
  const { username } = useParams<{ username: string }>();
  const {
    data: profile,
    error,
    isLoading,
  } = username
    ? useGetProfileQuery(username, { refetchOnMountOrArgChange: true })
    : { data: null, error: null, isLoading: false };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorAlert message="Something went wrong. Please try again." />;
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      <ProfileHeader profile={profile!} />
      <div className="container flex justify-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
