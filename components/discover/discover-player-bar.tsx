"use client";

import {
  Maximize2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { useDiscoverUI } from "@/components/discover/discover-ui-context";
import { TrackArtwork } from "./track-artwork";

export function DiscoverPlayerBar() {
  const { nowPlaying, isPlaying } = useDiscoverUI();

  if (!nowPlaying) return null;

  const { track } = nowPlaying;

  return (
    <footer className="flex h-[72px] shrink-0 items-center gap-4 border-t border-border bg-surface-1 px-4 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <TrackArtwork stage={track.stage} artist={track.artist} isPlaying={isPlaying} className="size-12" />
        <div className="min-w-0 flex-col gap-0.5 hidden sm:flex">
          <span className="truncate text-sm font-medium text-text-primary">{track.trackTitle}</span>
          <span className="truncate text-xs text-text-secondary">{track.artist}</span>
        </div>
      </div>

      <div className="flex flex-[2] flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Shuffle" className="text-text-tertiary hover:text-text-primary">
            <Shuffle className="size-4" />
          </button>
          <button type="button" aria-label="Previous" className="text-text-tertiary hover:text-text-primary">
            <SkipBack className="size-4 fill-current" />
          </button>
          <button
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex size-8 items-center justify-center rounded-full bg-white text-black hover:scale-105"
          >
            {isPlaying ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
          </button>
          <button type="button" aria-label="Next" className="text-text-tertiary hover:text-text-primary">
            <SkipForward className="size-4 fill-current" />
          </button>
          <button type="button" aria-label="Repeat" className="text-text-tertiary hover:text-text-primary">
            <Repeat className="size-4" />
          </button>
        </div>
        <div className="flex w-full max-w-md items-center gap-2">
          <span className="text-[10px] tabular-nums text-text-tertiary">1:24</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-3">
            <div className="h-full w-[32%] rounded-full bg-white" />
          </div>
          <span className="text-[10px] tabular-nums text-text-tertiary">
            {Math.floor(track.durationSec / 60)}:
            {(track.durationSec % 60).toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-end gap-2 sm:flex">
        <Volume2 className="size-4 text-text-tertiary" />
        <div className="h-1 w-24 overflow-hidden rounded-full bg-surface-3">
          <div className="h-full w-2/3 rounded-full bg-white" />
        </div>
        <button type="button" aria-label="Fullscreen" className="text-text-tertiary hover:text-text-primary">
          <Maximize2 className="size-4" />
        </button>
      </div>
    </footer>
  );
}
