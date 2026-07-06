"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { RecentlyPlayedTrack } from "@/lib/types";

interface RecentlyPlayedRowProps {
  tracks: RecentlyPlayedTrack[];
  className?: string;
}

/**
 * Spotify-style listening context row with mock album artwork.
 */
export function RecentlyPlayedRow({ tracks, className }: RecentlyPlayedRowProps) {
  if (tracks.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="discover-overline-muted">Because you&apos;ve been playing</span>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {tracks.slice(0, 4).map((track, index) => (
          <motion.button
            key={track.id}
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
            className="group flex items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
          >
            <div className="relative size-12 shrink-0 overflow-hidden rounded-md">
              <Image
                src={track.artworkUrl}
                alt={`${track.title} by ${track.artist}`}
                fill
                sizes="48px"
                className="object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Play className="size-4 fill-white text-white" />
              </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-sm font-semibold text-text-primary">{track.title}</span>
              <span className="truncate text-xs text-text-secondary">
                {track.artist} · {formatRelativeTime(track.playedAt)}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
