"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { DiscoveryJourney } from "@/lib/types";
import { JourneyTrackCard } from "./journey-track-card";

interface RecommendationJourneyProps {
  journey: DiscoveryJourney;
  playingTrackId: string | null;
  resolvedTrackIds: Set<string>;
  savedTrackIds: Set<string>;
  onTogglePreview: (trackId: string) => void;
  onKeep: (trackId: string) => void;
  onSkip: (trackId: string) => void;
  onReset: () => void;
}

function formatJourneyDuration(tracks: DiscoveryJourney["tracks"]): string {
  const totalMin = Math.round(tracks.reduce((sum, t) => sum + t.durationSec, 0) / 60);
  return `${tracks.length} steps · ${totalMin} min`;
}

export function RecommendationJourney({
  journey,
  playingTrackId,
  resolvedTrackIds,
  savedTrackIds,
  onTogglePreview,
  onKeep,
  onSkip,
  onReset,
}: RecommendationJourneyProps) {
  const activeIndex = journey.tracks.findIndex((t) => !resolvedTrackIds.has(t.id));
  const completedCount = journey.tracks.filter((t) => resolvedTrackIds.has(t.id)).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4 border-t border-border/60 pt-8">
        <div className="flex flex-col gap-1">
          <span className="discover-overline-muted">Your discovery journey</span>
          <h2 className="text-lg font-bold text-text-primary sm:text-xl">Your Discovery Journey</h2>
          <p className="text-xs text-text-tertiary">{formatJourneyDuration(journey.tracks)}</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary"
        >
          <RotateCcw className="size-3.5" />
          Start over
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-3">
          <motion.div
            className="h-full bg-brand-green"
            animate={{ width: `${(completedCount / journey.tracks.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <span className="shrink-0 text-[11px] font-medium tabular-nums text-text-tertiary">
          {completedCount}/{journey.tracks.length}
        </span>
      </div>

      <div className="flex flex-col" role="list">
        {journey.tracks.map((track, index) => (
          <motion.div
            key={track.id}
            role="listitem"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
          >
            <JourneyTrackCard
              track={track}
              stepIndex={index}
              isPlaying={playingTrackId === track.id}
              isSaved={savedTrackIds.has(track.id)}
              isResolved={resolvedTrackIds.has(track.id)}
              isActive={index === activeIndex}
              onKeep={() => onKeep(track.id)}
              onSkip={() => onSkip(track.id)}
              onPreview={() => onTogglePreview(track.id)}
            />
          </motion.div>
        ))}
      </div>

      {completedCount === journey.tracks.length ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-md bg-surface-1 px-5 py-4 text-center"
        >
          <p className="text-sm font-semibold text-text-primary">Journey complete</p>
          <p className="mt-1 text-xs text-text-tertiary">Your taste profile has been updated.</p>
        </motion.div>
      ) : null}
    </div>
  );
}
