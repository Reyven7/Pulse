import { MomentPreviewData } from "@/models/moment";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

type Props = {
  data: MomentPreviewData;
};

const MomentPreview = ({ data }: Props) => {
  const timeAgo = formatDistanceToNow(new Date(data.creationDate), {
    addSuffix: true,
  });

  return (
    <div className="flex cursor-pointer items-center gap-4 transition-all hover:opacity-90 hover:shadow-lg">
      <Avatar className="relative h-10 w-10 rounded-full border-2 border-white/70 p-[2px]">
        <AvatarImage
          src={data.avatar}
          alt={data.name}
          className="h-full w-full rounded-full object-cover"
        />
        <AvatarFallback className="text-gray-500">NO</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-200">{data.name}</span>
        <p className="text-xs text-gray-500">{timeAgo}</p>
      </div>
    </div>
  );
};

export default MomentPreview;
