"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DiscoveryJourney, FeedbackType } from "@/lib/types";
import { SectionHeader } from "@/components/shared/section-header";
import { RecommendationCard } from "./recommendation-card";

interface RecommendationJourneyProps {
  journey: DiscoveryJourney;
  playingTrackId: string | null;
  onTogglePreview: (trackId: string) => void;
  savedTrackIds: Set<string>;
  onToggleSave: (trackId: string) => void;
  feedbackByTrack: Record<string, FeedbackType[]>;
  onFeedback: (trackId: string, type: FeedbackType) => void;
  onReset: () => void;
}

export function RecommendationJourney({
  journey,
  playingTrackId,
  onTogglePreview,
  savedTrackIds,
  onToggleSave,
  feedbackByTrack,
  onFeedback,
  onReset,
}: RecommendationJourneyProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <SectionHeader
          eyebrow="Explore"
          title="Your Discovery Journey"
          action={
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
            >
              <RotateCcw className="size-3.5" />
              Start over
            </button>
          }
        />
        <p className="-mt-2 text-sm leading-relaxed text-text-secondary">{journey.promptSummary}</p>
      </div>

      <div className="flex flex-col" role="list">
        {journey.tracks.map((track, index) => {
          const isActive = index === 0 || playingTrackId === track.id;
          return (
            <motion.div
              key={track.id}
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center pt-1">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300",
                    isActive ? "bg-brand-green text-black" : "bg-surface-3 text-text-secondary"
                  )}
                >
                  {index + 1}
                </motion.div>
                {index < journey.tracks.length - 1 ? (
                  <motion.div
                    className="my-1.5 w-px flex-1 origin-top bg-border"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                    aria-hidden
                  />
                ) : null}
              </div>
              <RecommendationCard
                track={track}
                isPlaying={playingTrackId === track.id}
                onTogglePreview={() => onTogglePreview(track.id)}
                isSaved={savedTrackIds.has(track.id)}
                onToggleSave={() => onToggleSave(track.id)}
                feedbackGiven={feedbackByTrack[track.id] ?? []}
                onFeedback={(type) => onFeedback(track.id, type)}
                className="mb-6 flex-1"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
