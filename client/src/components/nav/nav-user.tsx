import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogIn,
  LogOut,
  Sparkles,
  User,
  Verified,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, logout, selectUser } from "@/services/accountSlice";
import { Link } from "react-router-dom";
import UserAvatar from "@/components/user-avatar";
import { useLogoutMutation } from "@/services/accountApi";

const NavUser = () => {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();
  const user = useSelector(selectUser);
  const isAuthenticatedUser = useSelector(isAuthenticated);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SidebarMenu>
      {!isAuthenticatedUser || !user ? (
        <div className="space-y-2 pt-3">
          <SidebarMenuButton variant="outline" className="w-full" asChild>
            <Link to="/authentication/login">
              <LogIn />
              <span>Login</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton variant="outline" className="w-full" asChild>
            <Link to="/authentication/register">
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
                className="cursor-pointer flex items-center gap-2 p-2 rounded-lg hover:bg-sidebar-accent"
              >
                <UserAvatar user={user} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold flex items-center gap-1">
                    {user.username}
                    {user?.role == "PremiumUser" ? (
                      <Verified className="h-3.5 w-3.5" />
                    ) : null}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
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
                <div className="flex items-center gap-2 px-2 py-2 text-sm">
                  <UserAvatar user={user} />

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.username}
                    </span>
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
                <Link to={`/profile/${user.username}`}>
                  <DropdownMenuItem className="flex">
                    <BadgeCheck className="mr-2" />
                    <span>Account</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <CreditCard className="mr-2" /> Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2" /> Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
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
