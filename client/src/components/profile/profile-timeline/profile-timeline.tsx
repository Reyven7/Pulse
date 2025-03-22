import PostCreator from "@/components/post-creator";
import ProfileIntroduction from "./profile-introduction";
import { useGetPostsByUsernameQuery } from "@/services/postApi";
import { useParams } from "react-router-dom";
import Loader from "@/components/loader";
import ErrorAlert from "@/components/error-alert";
import Post from "@/components/posts/post";
import { ScrollArea } from "@/components/ui/scroll-area";

const ProfileTimeline = () => {
  const { username } = useParams<{ username: string }>();
  const { data, error, isLoading } = username
    ? useGetPostsByUsernameQuery(username)
    : { data: null, error: null, isLoading: false };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorAlert message="Something went wrong. Please try again." />;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-screen-lg mx-auto gap-4 px-4">
      <div className="lg:w-1/3 w-full shadow-lg rounded-lg p-4">
        <ProfileIntroduction />
      </div>

      <div className="lg:w-2/3 w-full space-y-4 shadow-lg rounded-lg p-4">
        <PostCreator />
        <ScrollArea className="max-h-[80vh]">
          <div className="space-y-4 py-2">
            {data && data.length > 0 ? (
              data.map((post) => <Post key={post.id} postData={post} />)
            ) : (
              <div>No posts available.</div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProfileTimeline;
