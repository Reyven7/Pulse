import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
  useSidebar,
} from "@/components/ui/sidebar";

type Props = {};

const SearchForm = ({}: Props) => {
  const { open } = useSidebar();

  return (
    <form>
      <SidebarGroup className="pt-3">
        <SidebarGroupContent className="relative flex items-center">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Search
            className={`absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50 transition-all`}
          />
          {open && (
            <SidebarInput
              id="search"
              placeholder="Type to Search..."
              className="pl-8 transition-all"
            />
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
};

export default SearchForm;
