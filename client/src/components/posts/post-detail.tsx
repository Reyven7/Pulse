import { useState } from "react";
import Post from "@/components/posts/post";
import Comment from "@/components/comment";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  useCreateCommentMutation,
  useGetCommentQuery,
} from "@/services/commentApi";
import { useGetPostByIdQuery } from "@/services/postApi";
import Loader from "../loader";
import { useParams } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import { useSelector } from "react-redux";
import { selectUser } from "@/services/accountSlice";
import { Toaster } from "@/components/ui/sonner";
import ErrorAlert from "@/components/error-alert";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [createComment] = useCreateCommentMutation();
  const user = useSelector(selectUser);

  const {
    data: post,
    isLoading: isPostLoading,
    refetch,
  } = useGetPostByIdQuery(postId!);
  const { data: comments, isLoading: isCommentsLoading } = useGetCommentQuery(
    postId!
  );
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!newComment.trim()) return;
    if (!user) return;
    setIsSubmitting(true);

    try {
      await createComment({
        content: newComment,
        postId: postId!,
        userId: user.id,
      }).unwrap();

      setNewComment("");
      refetch();
    } catch (err) {
      console.error("Comment create failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPostLoading || isCommentsLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {post && <Post postData={post} />}

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="h-5 w-5 text-zinc-300" />
          <h2 className="text-xl font-semibold text-white">Comments</h2>
        </div>

        <div className="bg-zinc-900 rounded-lg border border-zinc-800">
          {comments?.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>

        <div className="mt-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write something..."
            className="w-full p-3 rounded-lg border resize-none"
            rows={3}
          />
          <Button
            onClick={handleAddComment}
            className="mt-2 border-2"
            variant="outline"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add comment"}
          </Button>
        </div>

        {isSubmitting && !newComment && (
          <ErrorAlert message="Please write a comment." />
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default PostDetail;
