import { MomentPreview } from "@/models/types/content/moment";
import { SidebarMenu } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import MomentsList from "@/components/moments/moments-list";

type Props = {};

const data: MomentPreview[] = [
  {
    name: "Alex",
    avatar: "https://picsum.photos/id/237/200/300",
    createdAt: new Date(),
  },
  {
    name: "Rachel",
    avatar: "https://picsum.photos/id/345/200/300",
    createdAt: new Date(),
  },
  {
    name: "Liza",
    avatar: "https://picsum.photos/id/145/200/300",
    createdAt: new Date(),
  },
  {
    name: "Tom",
    avatar: "https://picsum.photos/id/142/200/300",
    createdAt: new Date(),
  },
  {
    name: "Andre",
    avatar: "https://picsum.photos/id/217/200/300",
    createdAt: new Date(),
  },
  {
    name: "Drake",
    avatar: "https://picsum.photos/id/227/200/300",
    createdAt: new Date(),
  },
  {
    name: "Ray",
    avatar: "https://github.com/shadcn.png",
    createdAt: new Date(),
  },
];

const MomentsBlock = ({}: Props) => {
  return (
    <div className="px-2">
      <h1 className="py-2 text-xl font-bold text-white">Moments</h1>
      <SidebarMenu className="rounded-lg shadow-md">
        <ScrollArea className="h-full max-h-[350px]">
          <MomentsList data={data} />
        </ScrollArea>
      </SidebarMenu>
    </div>
  );
};

export default MomentsBlock;
