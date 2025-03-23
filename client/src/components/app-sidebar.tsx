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
import { useLocation } from "react-router-dom";

const NAV_ITEMS: NavigationItem[] = [
  { title: "Home", url: "#", icon: Home, isActive: false },
  { title: "Posts", url: "/posts", icon: BookCopy, isActive: false },
  { title: "Popular", url: "#", icon: Flame, isActive: false },
  { title: "Personal", url: "#", icon: User, isActive: false },
];

const AppSidebar = () => {
  const { pathname } = useLocation();

  const updatedNavItems = NAV_ITEMS.map((item) => ({
    ...item,
    isActive: pathname === item.url,
  }));

  return (
    <Sidebar className="border-r-0" collapsible="icon">
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>

      <SidebarContent>
        <SearchForm />
        <NavHome items={updatedNavItems} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
