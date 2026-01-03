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
    const currentRoute = ROUTES.find(route => {
      if (route.path === location.pathname) return true;
      if (route.path.includes(":id")) {
        const basePath = route.path.split("/:id")[0];
        return location.pathname.startsWith(basePath);
      }
      return false;
    });

    if (!currentRoute) return null;

    const items: { label: string; href?: string }[] = [
      { label: t("sidebar.home"), href: "/" },
    ];

    if (currentRoute.path !== "/") {
      items.push({
        label: t(
          `sidebar.${currentRoute.path.replace("/", "").replace("/", "_")}`
        ),
      });
    }

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
