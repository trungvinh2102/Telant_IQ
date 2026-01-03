import { lazy } from "react";

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
