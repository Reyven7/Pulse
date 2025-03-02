import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarLeft from "@/components/sidebar/sidebar-left";
import SidebarRight from "@/components/sidebar/sidebar-right";
import { Separator } from "@radix-ui/react-separator";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarRight />
    </SidebarProvider>
  );
}
