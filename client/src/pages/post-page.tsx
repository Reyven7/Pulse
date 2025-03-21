import ErrorAlert from "@/components/error-alert";
import Loader from "@/components/loader";
import Post from "@/components/posts/post";
import { useGetPostsQuery } from "@/services/postApi";

const PostPage = () => {
  const { data, error, isLoading } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log("Дані постів:", data);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorAlert message="Something went wrong. Please try again." />;
  }

  return (
    <div className="flex justify-center ">
      <div className=" px-8">
        {data && data.length > 0 ? (
          data.map((post) => (
            <div key={post.id} className="mb-6">
              <Post postData={post} />
            </div>
          ))
        ) : (
          <div>No posts! Sorry..</div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
