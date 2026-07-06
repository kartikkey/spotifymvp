"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RECOMMENDATION_STAGE_LABELS,
  RECOMMENDATION_STAGES,
  type DiscoveryJourney,
} from "@/lib/types";
import { SwipeableRecommendationCard } from "./swipeable-recommendation-card";

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
  const completedCount = journey.tracks.filter((t) => resolvedTrackIds.has(t.id)).length;
  const activeIndex = journey.tracks.findIndex((t) => !resolvedTrackIds.has(t.id));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="discover-overline-muted">Your journey</span>
          <h2 className="text-xl font-bold text-text-primary sm:text-2xl">Discovery Journey</h2>
          <p className="text-sm text-text-secondary">{journey.promptSummary}</p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary"
        >
          <RotateCcw className="size-3.5" />
          Start over
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <nav className="hidden w-44 shrink-0 flex-col gap-0 lg:flex" aria-label="Journey progression">
          {RECOMMENDATION_STAGES.map((stage, index) => {
            const track = journey.tracks[index];
            const isComplete = track ? resolvedTrackIds.has(track.id) : false;
            const isActive = index === activeIndex;
            const isLast = index === RECOMMENDATION_STAGES.length - 1;

            return (
              <div key={stage} className="flex flex-col">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        backgroundColor: isComplete || isActive ? "#1db954" : "#282828",
                        color: isComplete || isActive ? "#000000" : "#b3b3b3",
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                    >
                      {isComplete ? "✓" : index + 1}
                    </motion.div>
                    {!isLast ? (
                      <div className="relative my-1 h-8 w-px overflow-hidden bg-border">
                        <motion.div
                          className="absolute inset-x-0 top-0 bg-brand-green"
                          initial={{ height: "0%" }}
                          animate={{ height: isComplete ? "100%" : "0%" }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>
                    ) : null}
                  </div>
                  <span
                    className={cn(
                      "pt-0.5 text-xs font-semibold leading-tight",
                      isActive ? "text-brand-green" : isComplete ? "text-text-primary" : "text-text-tertiary"
                    )}
                  >
                    {RECOMMENDATION_STAGE_LABELS[stage]}
                  </span>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-3">
              <motion.div
                className="h-full bg-brand-green"
                animate={{ width: `${(completedCount / journey.tracks.length) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <span className="shrink-0 text-xs font-medium tabular-nums text-text-tertiary">
              {completedCount}/{journey.tracks.length}
            </span>
          </div>

          <div className="flex flex-col gap-10">
            {journey.tracks.map((track, index) => {
              const isResolved = resolvedTrackIds.has(track.id);
              const isActive = index === activeIndex;

              if (!isResolved && !isActive) return null;

              return (
                <AnimatePresence key={track.id} mode="wait">
                  {!isResolved ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <SwipeableRecommendationCard
                        track={track}
                        isPlaying={playingTrackId === track.id}
                        isSaved={savedTrackIds.has(track.id)}
                        isResolved={false}
                        onKeep={() => onKeep(track.id)}
                        onSkip={() => onSkip(track.id)}
                        onPreview={() => onTogglePreview(track.id)}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              );
            })}

            {completedCount === journey.tracks.length ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="discover-card bg-surface-1 text-center"
              >
                <p className="text-sm font-semibold text-text-primary">Journey complete</p>
                <p className="mt-1 text-xs text-text-tertiary">
                  Your taste profile has been updated. Start a new journey anytime.
                </p>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
