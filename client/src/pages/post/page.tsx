import ErrorAlert from "@/components/error-alert";
import Loader from "@/components/loader";
import Post from "@/components/posts/post";
import { useGetPostsQuery } from "@/services/postApi";

const PostPage = () => {
  const { data, error, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorAlert message="Something went wrong. Please try again." />;
  }

  return (
    <div className="flex flex-wrap gap-4 max-w-3xl mx-auto justify-center">
      {data && data.length > 0 ? (
        data.map((post) => <Post key={post.id} postData={post} />)
      ) : (
        <div>No posts available.</div>
      )}
    </div>
  );
};

export default PostPage;
