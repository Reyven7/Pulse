import PostCreator from "@/components/post-creator";
import ProfileIntroduction from "./profile-introduction";

const ProfileTimeline = () => {
  return (
    <div className="flex w-full gap-5">
      <div className="flex-none w-1/3">
        <ProfileIntroduction />
      </div>

      <div className="flex-grow w-2/3">
        <PostCreator />
      </div>
    </div>
  );
};

export default ProfileTimeline;
