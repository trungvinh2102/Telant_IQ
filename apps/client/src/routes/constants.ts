import {
  LucideIcon,
  Home,
  LayoutDashboard,
  Layers,
  HelpCircle,
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: "sidebar.home",
    url: "/",
    icon: Home,
  },
  {
    title: "sidebar.dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "sidebar.session",
    url: "/session",
    icon: Layers,
  },
  {
    title: "sidebar.problems",
    url: "/problem",
    icon: HelpCircle,
  },
];
