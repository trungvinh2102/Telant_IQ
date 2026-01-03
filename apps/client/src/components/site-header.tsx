import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HeaderActions } from "@/components/header-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES } from "@/routes";

export function SiteHeader() {
  const { t } = useTranslation();
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter(x => x);
    const items: { label: string; href?: string }[] = [
      { label: t("sidebar.home"), href: "/" },
    ];

    let currentPath = "";
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      const isLast = index === pathnames.length - 1;

      // Find if this path matches a route (handling dynamic segments)
      const route = ROUTES.find(r => {
        if (r.path === currentPath) return true;

        // Handle dynamic route matching (e.g. /problem/:id)
        const routeParts = r.path.split("/").filter(x => x);
        const pathParts = currentPath.split("/").filter(x => x);

        if (routeParts.length !== pathParts.length) return false;

        return routeParts.every(
          (part, i) => part.startsWith(":") || part === pathParts[i]
        );
      });

      if (route) {
        // Map route path to translation key
        // e.g. /problem -> problems
        // e.g. /dashboard -> dashboard
        // e.g. /problem/:id -> problemDetail.title
        let labelKey = "";
        if (route.path === "/problem") labelKey = "sidebar.problems";
        else if (route.path.includes(":id"))
          labelKey = "pages.problemDetail.title";
        else labelKey = `sidebar.${pathname}`;

        items.push({
          label: t(labelKey),
          href: isLast ? undefined : currentPath,
        });
      } else if (!isLast) {
        // If we don't have a direct route match but it's middle segment
        items.push({
          label: pathname.charAt(0).toUpperCase() + pathname.slice(1),
          href: currentPath,
        });
      }
    });

    return items;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="flex items-center h-12 gap-2 px-4 border-b shrink-0">
      <div className="flex items-center justify-between w-full gap-1 lg:gap-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs?.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink href={item.href}>
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <HeaderActions />
      </div>
    </header>
  );
}
