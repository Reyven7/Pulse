import { ComponentType } from "react";

export interface NavItem {
  title: string;
  url: string;
  icon: ComponentType;
  isActive: boolean;
}

export interface NavUserProps {
  name: string;
  email: string;
  avatar: string;
}
