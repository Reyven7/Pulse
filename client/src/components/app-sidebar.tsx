import { BookCopy, Flame, Home, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavigationItem } from "@/models/types/ui/navigation";
import SearchForm from "@/components/forms/search-form";
import NavHome from "@/components/nav/nav-home";
import NavUser from "@/components/nav/nav-user";

const NAV_ITEMS: NavigationItem[] = [
  { title: "Home", url: "#", icon: Home, isActive: true },
  { title: "Posts", url: "/posts", icon: BookCopy, isActive: true },
  { title: "Popular", url: "#", icon: Flame, isActive: true },
  { title: "Personal", url: "#", icon: User, isActive: true },
];

const AppSidebar = () => {
  return (
    <Sidebar className="border-r-0" collapsible="icon">
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>

      <SidebarContent>
        <SearchForm />
        <NavHome items={NAV_ITEMS} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
