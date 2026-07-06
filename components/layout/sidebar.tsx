"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONSUMER_NAV_ITEMS } from "./nav-items";
import { useDiscoverUI } from "@/components/discover/discover-ui-context";
import { TrackArtwork } from "@/components/discover/track-artwork";

export function Sidebar() {
  const pathname = usePathname();
  const { openProfile, nowPlaying, isPlaying } = useDiscoverUI();

  return (
    <aside className="hidden w-[220px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-14 items-center gap-2 px-4">
        <Image src="/logo/spotify-mark.webp" alt="" width={24} height={24} className="shrink-0" />
        <span className="truncate text-sm font-bold tracking-tight text-sidebar-foreground">
          Discover<span className="text-brand-green">+</span>
          <span className="font-normal text-sidebar-foreground/50"> by Spotify</span>
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {CONSUMER_NAV_ITEMS.map((item) => {
          const isDiscover = item.href === "/discover";
          const active =
            item.action === "profile"
              ? false
              : pathname.startsWith(item.href.split("#")[0]);

          const linkClassName = cn(
            "flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors",
            active && isDiscover
              ? "bg-brand-green text-black"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          );

          if (item.action === "profile") {
            return (
              <button key={item.label} type="button" onClick={openProfile} className={linkClassName}>
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

      <div className="flex flex-col gap-3 border-t border-sidebar-border px-4 py-4">
        <span className="w-fit rounded-full bg-surface-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
          Beta
        </span>
        <p className="text-[11px] leading-relaxed text-sidebar-foreground/40">
          You&apos;re previewing an early version of Discover+. Share feedback to help us improve.
        </p>
        <a
          href="https://open.spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-medium text-sidebar-foreground/50 hover:text-sidebar-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to Spotify
        </a>
      </div>

      {nowPlaying ? (
        <div className="flex items-center gap-2.5 border-t border-sidebar-border px-3 py-3">
          <div className="relative">
            <TrackArtwork
              stage={nowPlaying.track.stage}
              artist={nowPlaying.track.artist}
              isPlaying={isPlaying}
              className="size-11"
            />
            {isPlaying ? (
              <span className="absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-brand-green">
                <Check className="size-2.5 text-black" strokeWidth={3} />
              </span>
            ) : null}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xs font-semibold text-sidebar-foreground">
              {nowPlaying.track.trackTitle}
            </span>
            <span className="truncate text-[10px] text-sidebar-foreground/50">
              {nowPlaying.track.artist}
            </span>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
