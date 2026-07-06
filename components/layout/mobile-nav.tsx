"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONSUMER_NAV_ITEMS } from "./nav-items";
import { useDiscoverUI } from "@/components/discover/discover-ui-context";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { openProfile } = useDiscoverUI();

  function handleProfileClick() {
    setOpen(false);
    openProfile();
  }

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
        <SheetHeader className="flex-row items-center gap-2.5 space-y-0 border-b border-sidebar-border px-4 py-3">
          <Image src="/logo/spotify-mark.webp" alt="" width={22} height={22} />
          <SheetTitle className="text-sm font-bold tracking-tight text-sidebar-foreground">
            Discover<span className="text-brand-green">+</span>
            <span className="font-normal text-sidebar-foreground/50"> by Spotify</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-2 py-2">
          {CONSUMER_NAV_ITEMS.map((item) => {
            const active =
              item.action === "profile"
                ? pathname.startsWith("/discover")
                : pathname.startsWith(item.href.split("#")[0]);

            if (item.action === "profile") {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={handleProfileClick}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold",
                    active
                      ? "bg-sidebar-accent text-sidebar-foreground"
                      : "text-sidebar-foreground/70"
                  )}
                >
                  <item.icon className="size-5 shrink-0" strokeWidth={1.75} />
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold",
                  active
                    ? "bg-sidebar-accent text-sidebar-foreground"
                    : "text-sidebar-foreground/70"
                )}
              >
                <item.icon className="size-5 shrink-0" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-sidebar-border px-2 py-3">
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60"
          >
            <ArrowLeft className="size-4 shrink-0" strokeWidth={1.75} />
            Back to Spotify
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
