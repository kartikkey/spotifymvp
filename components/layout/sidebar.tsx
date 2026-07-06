"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONSUMER_NAV_ITEMS } from "./nav-items";
import { useDiscoverUI } from "@/components/discover/discover-ui-context";

export function Sidebar() {
  const pathname = usePathname();
  const { openProfile } = useDiscoverUI();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-14 items-center gap-2.5 px-5">
        <Image src="/logo/spotify-mark.webp" alt="" width={24} height={24} className="shrink-0" />
        <span className="truncate text-sm font-bold tracking-tight text-sidebar-foreground">
          Spotify Discover
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2 py-2">
        {CONSUMER_NAV_ITEMS.map((item) => {
          const active =
            item.action === "profile"
              ? pathname.startsWith("/discover")
              : pathname.startsWith(item.href.split("#")[0]);

          const linkClassName = cn(
            "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors",
            active
              ? "bg-sidebar-accent text-sidebar-foreground"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          );

          if (item.action === "profile") {
            return (
              <button
                key={item.label}
                type="button"
                onClick={openProfile}
                className={linkClassName}
              >
                <item.icon className="size-5 shrink-0" strokeWidth={1.75} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={linkClassName}
            >
              <item.icon className="size-5 shrink-0" strokeWidth={1.75} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border px-2 py-3">
        <a
          href="https://open.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <ArrowLeft className="size-4 shrink-0" strokeWidth={1.75} />
          <span>Back to Spotify</span>
        </a>
      </div>
    </aside>
  );
}
