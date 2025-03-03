import ErrorAlert from "@/components/error-alert";
import Loader from "@/components/loader";
import ProfileHeader from "@/components/profile/profile-header";
import { useGetProfileQuery } from "@/services/profileAPI";
import { Outlet, useParams } from "react-router-dom";

const ProfileLayout = () => {
  const { username } = useParams<{ username: string }>();
  const {
    data: profile,
    error,
    isLoading,
  } = username
    ? useGetProfileQuery(username)
    : { data: null, error: null, isLoading: false };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorAlert message="Something went wrong. Please try again." />;
  }

  return (
    <div className="p-5 pt-2">
      <ProfileHeader profile={profile!} />
      <div className="container mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
