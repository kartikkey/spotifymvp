"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_GROUPS } from "./nav-items";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
      </Button>
      <SheetContent side="left" className="w-64 bg-sidebar p-0 text-sidebar-foreground">
        <SheetHeader className="flex-row items-center gap-2 space-y-0 border-b border-sidebar-border px-4 py-3">
          <Image src="/logo/spotify-mark.webp" alt="" width={22} height={22} />
          <SheetTitle className="text-sm font-bold tracking-tight text-sidebar-foreground">
            Amplify
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-2 py-2">
          {NAV_GROUPS.map((group, groupIndex) => (
            <div key={group.label} className={cn("flex flex-col gap-1", groupIndex > 0 && "mt-3")}>
              <span className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                {group.label}
              </span>
              {group.items.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70",
                      active && "bg-sidebar-accent text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="size-4.5 shrink-0" strokeWidth={1.75} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
