import { Captions, Flame, Home, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";


import { NavItem, NavUserProps } from "@/models/nav";
import SearchForm from "../forms/search-form";
import NavHome from "../nav/nav-home";
import NavUser from "../nav/nav-user";

const NAV_ITEMS: NavItem[] = [
  { title: "Home", url: "#", icon: Home, isActive: true },
  { title: "Popular", url: "#", icon: Flame, isActive: true },
  { title: "Personal", url: "#", icon: User, isActive: true },
  { title: "Themes", url: "#", icon: Captions, isActive: true },
];

const user: NavUserProps = {
  name: "Rayven",
  email: "",
  avatar:
    "https://i.pinimg.com/736x/0f/94/04/0f94048f78aaf19d9cee928d0270c88c.jpg",
};

const SidebarLeft = () => {
  return (
    <Sidebar className="border-r-0" collapsible="icon">
      <SidebarHeader>
        <NavUser user={user} />
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        <NavHome items={NAV_ITEMS} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default SidebarLeft;
