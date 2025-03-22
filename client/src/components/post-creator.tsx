import { selectUser } from "@/services/accountSlice";
import { useCreatePostMutation } from "@/services/postApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Paperclip } from "lucide-react";

export default function PostCreator() {
  const { username } = useParams<{ username: string }>();
  const user = useSelector(selectUser);
  const [createPost] = useCreatePostMutation();
  const formRef = useRef<HTMLFormElement>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  if (!user || username !== user.username) return null;

  const handlePostCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await createPost({
        content: formData.get("content") as string,
        mediaContent: [],
        userId: user.id,
      }).unwrap();

      formRef.current?.reset();
      setMediaFile(null);
    } catch (err) {
      console.error("Post create failed:", err);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setMediaFile(file);
  };

  return (
    <div className="w-full sm:w-[590px] bg-black rounded-lg p-4 border">
      <form
        ref={formRef}
        onSubmit={handlePostCreate}
        className="flex flex-col gap-4"
      >
        <Textarea
          name="content"
          placeholder="Write something..."
          className="w-full border-b p-2 resize-none"
          required
          rows={4}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label
              htmlFor="file-upload"
              className="text-sm cursor-pointer flex items-center gap-1"
            >
              <Paperclip size={18} />
              {mediaFile ? (
                <span>File attached</span>
              ) : (
                <span>Attach a file</span>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <Button type="submit" size="sm" className="px-4 py-1 text-sm">
            Share
          </Button>
        </div>
      </form>
    </div>
  );
}
