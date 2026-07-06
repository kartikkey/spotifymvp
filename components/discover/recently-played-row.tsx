"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import { ACCENT_COLOR_VAR } from "@/lib/theme";
import type { AccentToken } from "@/lib/types";
import type { RecentlyPlayedTrack } from "@/lib/types";

const ARTIST_ACCENTS: AccentToken[] = ["blue", "purple", "pink", "orange", "gold"];

function accentForArtist(artist: string): [AccentToken, AccentToken] {
  const hash = artist.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const from = ARTIST_ACCENTS[hash % ARTIST_ACCENTS.length];
  const to = ARTIST_ACCENTS[(hash + 2) % ARTIST_ACCENTS.length];
  return [from, to];
}

interface RecentlyPlayedRowProps {
  tracks: RecentlyPlayedTrack[];
  className?: string;
}

/**
 * Spotify-style listening context row — the weakest pre-journey surface,
 * redesigned with artwork tiles, hover play affordance, and tight metadata rhythm.
 */
export function RecentlyPlayedRow({ tracks, className }: RecentlyPlayedRowProps) {
  if (tracks.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <span className="discover-overline-muted">Because you&apos;ve been playing</span>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {tracks.slice(0, 4).map((track, index) => {
          const [from, to] = accentForArtist(track.artist);
          return (
            <motion.button
              key={track.id}
              type="button"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
              className="group flex items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
            >
              <div className="relative size-12 shrink-0 overflow-hidden rounded-md">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_COLOR_VAR[from]}, ${ACCENT_COLOR_VAR[to]})`,
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-black/40">
                  {track.artist.charAt(0)}
                </span>
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
          );
        })}
      </div>
    </div>
  );
}
