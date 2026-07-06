"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_USER, signOut } from "@/lib/session";
import { NAV_ITEMS } from "./nav-items";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  function handleSignOut() {
    signOut();
    router.push("/login");
  }

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 md:flex",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className={cn("flex h-14 items-center gap-2 px-4", collapsed && "justify-center px-0")}>
        <Image src="/logo/spotify-mark.webp" alt="" width={24} height={24} className="shrink-0" />
        {!collapsed && (
          <span className="truncate text-sm font-bold tracking-tight text-sidebar-foreground">
            Amplify
          </span>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const linkClassName = cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
            active && "bg-sidebar-accent text-sidebar-foreground",
            collapsed && "justify-center px-0"
          );
          const content = (
            <>
              <item.icon className="size-4.5 shrink-0" strokeWidth={1.75} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </>
          );

          if (!collapsed) {
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={linkClassName}
              >
                {content}
              </Link>
            );
          }

          return (
            <Tooltip key={item.href}>
              <TooltipTrigger
                render={
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={linkClassName}
                  />
                }
              >
                {content}
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-sidebar-border px-2 py-2">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "justify-center px-0"
          )}
        >
          {collapsed ? (
            <ChevronsRight className="size-4.5 shrink-0" strokeWidth={1.75} />
          ) : (
            <>
              <ChevronsLeft className="size-4.5 shrink-0" strokeWidth={1.75} />
              <span>Collapse</span>
            </>
          )}
        </button>

        <div
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2",
            collapsed && "justify-center px-0"
          )}
        >
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-3 text-xs font-semibold text-text-primary">
            {MOCK_USER.initials}
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-xs font-medium text-sidebar-foreground">
                {MOCK_USER.name}
              </span>
            </div>
          )}
          {!collapsed && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    onClick={handleSignOut}
                    aria-label="Sign out"
                    className="flex size-7 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  />
                }
              >
                <LogOut className="size-4" strokeWidth={1.75} />
              </TooltipTrigger>
              <TooltipContent side="right">Sign out</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </aside>
  );
}
