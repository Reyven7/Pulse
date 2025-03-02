import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavItem } from "@/models/nav";
import { Link } from "react-router-dom";

const NavHome = ({ items }: { items: NavItem[] }) => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => ( 
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.isActive}>
              <Link to={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavHome;
