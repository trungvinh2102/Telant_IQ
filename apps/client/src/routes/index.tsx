import { lazy } from "react";
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

export const ROUTES = [
  {
    path: "/",
    title: "Home",
    component: lazy(() => import("@/pages/Home")),
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    component: lazy(() => import("@/pages/Dashboard")),
  },
  {
    path: "/session",
    title: "Session",
    component: lazy(() => import("@/pages/Session")),
  },
  {
    path: "/problem",
    title: "Problems",
    component: lazy(() => import("@/pages/Problems")),
  },
  {
    path: "/problem/:id",
    title: "Problem Detail",
    component: lazy(() => import("@/pages/ProblemDetail")),
  },
] as const;

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
