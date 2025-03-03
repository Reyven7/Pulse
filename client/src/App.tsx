import { useDispatch, useSelector } from "react-redux";
import SidebarLeft from "./components/sidebar/sidebar-left";
import SidebarRight from "./components/sidebar/sidebar-right";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { logout, selectUser, setUser } from "./services/accountSlice";
import { useEffect } from "react";
import { useCheckmeMutation } from "./services/accountApi";

function App() {
  const dispatch = useDispatch();
  const [checkme] = useCheckmeMutation();
  const user = useSelector(selectUser);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await checkme();
        if (response.data) {
          dispatch(setUser(response.data));
        }
      } catch (error) {
        dispatch(logout());
      }
    };

    if (!user) {
      checkAuthStatus();
    }
  }, [dispatch, user, checkme]);

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="bg-background sticky z-10 top-0 flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
          </div>
        </header>
        <Outlet />
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}

export default App;
