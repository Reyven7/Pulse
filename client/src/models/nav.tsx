import { ComponentType } from "react";

export interface NavItem {
  title: string;
  url: string;
  icon: ComponentType;
  isActive: boolean;
}

// export interface NavUserProps {
//   username: string;
//   email: string;
//   avatar: string;
// }
