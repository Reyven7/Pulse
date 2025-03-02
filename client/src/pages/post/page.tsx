import Post from "@/components/posts/post";
import { useGetPostsQuery } from "@/services/postApi";

const PostPage = () => {
  const { data, error, isLoading } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching profile data</div>;
  }
  console.log(data);

  return (
    <div className="space-y-4">
      {data && data.length > 0 ? (
        data.map((post) => <Post key={post.id} postData={post} />)
      ) : (
        <div>No posts available.</div>
      )}
    </div>
  );
};

export default PostPage;
