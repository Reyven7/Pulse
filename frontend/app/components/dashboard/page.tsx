import Post from "@/components/post/post";
import SidebarLeft from "@/components/sidebar/sidebar-left";
import { SidebarRight } from "@/components/sidebar/sidebar-right";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { PostInfo } from "@/models/post";


const post: PostInfo = {
  id: "1",
  author: "Reyven",
  authotAvatar: "https://i.pinimg.com/736x/0f/94/04/0f94048f78aaf19d9cee928d0270c88c.jpg",
  creationDate: new Date("2025-02-01"), 
  text: "Where is the patch?",

}

const Page = () => {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <Post data={post}/>
          <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
          <div className="bg-muted/50 mx-auto h-[100vh] w-full max-w-3xl rounded-xl" />
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
};

export default Page;
