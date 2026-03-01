<<<<<<< HEAD
"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
=======
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
<<<<<<< HEAD
} from "@/components/ui/dropdown-menu"
=======
} from "@/components/ui/dropdown-menu";
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
<<<<<<< HEAD
} from "@/components/ui/sidebar"
import { ChevronsUpDownIcon, SparklesIcon, BadgeCheckIcon, CreditCardIcon, BellIcon, LogOutIcon } from "lucide-react"
=======
} from "@/components/ui/sidebar";
import {
  ChevronsUpDownIcon,
  SparklesIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
} from "lucide-react";
import { auth } from "@/app/firebase/config";
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3

export function NavUser({
  user,
}: {
  user: {
<<<<<<< HEAD
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
=======
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
<<<<<<< HEAD
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
=======
                <AvatarFallback className="rounded-lg">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
<<<<<<< HEAD
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
=======
                  <AvatarFallback className="rounded-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
<<<<<<< HEAD
                <SparklesIcon
                />
=======
                <SparklesIcon />
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
<<<<<<< HEAD
                <BadgeCheckIcon
                />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon
                />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon
                />
=======
                <BadgeCheckIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
<<<<<<< HEAD
            <DropdownMenuItem>
              <LogOutIcon
              />
=======
            <DropdownMenuItem onClick={() => auth.signOut()}>
              <LogOutIcon />
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> 9331ffd1f520e9eb2ba8fe35347c8965f744e3d3
}
