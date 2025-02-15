import
{
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogIn,
  LogOut,
  Sparkles,
  User,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import
{
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import
{
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { NavUserProps } from "@/models/nav";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, logout } from "@/services/accountSlice";
import { RootState } from "@/Redux/store";
import { Link } from "react-router-dom";
const NavUser = ({ user }: { user: NavUserProps }) =>
{
  const { isMobile } = useSidebar();
  const isAuthenticatedUser: boolean = useSelector((state: RootState) => isAuthenticated(state));
  const dispatch = useDispatch()
  const handleLogout = () => dispatch(logout());

  return (
    <SidebarMenu>
      {!isAuthenticatedUser ? (
        <div className="space-y-2 pt-3">
          <SidebarMenuButton variant="outline" className="w-full" asChild>
            <Link to="login">
              <LogIn />
              <span>Login</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton variant="outline" className="w-full" asChild>
            <Link to="">
              <User />
              <span>Sign Up</span>
            </Link>
          </SidebarMenuButton>
        </div>
      ) : (
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-sidebar-accent"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="start"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-4 py-2 text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles className="mr-2" /> Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck className="mr-2" /> Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2" /> Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2" /> Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive hover:bg-red-100">
                <LogOut className="mr-2" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
};

export default NavUser;
