"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Tools &amp; Practice</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((section) => (
          <div key={section.title}>
            {/* Section label — subtle, small, with icon, not clickable */}
            <div className="flex items-center gap-1.5 px-2 pt-3 pb-1">
              <span className="text-muted-foreground/40 shrink-0 [&>svg]:size-3">
                {section.icon}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground/60 tracking-wide truncate">
                {section.title}
              </span>
            </div>

            {/* Indented nav items */}
            <SidebarMenuSub className="mx-0 border-l border-border/50 ml-3">
              {section.items?.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton asChild isActive={isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                );
              })}
            </SidebarMenuSub>
          </div>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
