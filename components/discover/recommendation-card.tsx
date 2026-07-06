"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Check, ChevronDown, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RECOMMENDATION_STAGE_DESCRIPTIONS,
  RECOMMENDATION_STAGE_LABELS,
  type DiscoveryTrack,
  type FeedbackType,
} from "@/lib/types";
import { TrackArtwork } from "./track-artwork";
import { ScoreBar } from "./score-bar";
import { FeedbackPanel } from "./feedback-panel";

interface RecommendationCardProps {
  track: DiscoveryTrack;
  isPlaying: boolean;
  onTogglePreview: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  feedbackGiven: FeedbackType[];
  onFeedback: (type: FeedbackType) => void;
  className?: string;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function RecommendationCard({
  track,
  isPlaying,
  onTogglePreview,
  isSaved,
  onToggleSave,
  feedbackGiven,
  onFeedback,
  className,
}: RecommendationCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("flex flex-col gap-4 rounded-lg bg-surface-2 p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-green">
          {RECOMMENDATION_STAGE_LABELS[track.stage]}
        </span>
        <span className="text-xs font-medium text-text-tertiary">{formatDuration(track.durationSec)}</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <TrackArtwork stage={track.stage} className="size-20 sm:size-24" />

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="truncate text-lg font-bold leading-snug text-text-primary">{track.trackTitle}</h3>
            <p className="truncate text-sm text-text-secondary">
              {track.artist} · {track.genre}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {track.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-3 px-2 py-0.5 text-[11px] font-medium text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <ScoreBar label="Energy" value={track.energy} colorClassName="bg-accent-orange" />
            <ScoreBar label="Familiarity" value={track.familiarityScore} colorClassName="bg-accent-blue" />
            <ScoreBar label="Discovery" value={track.discoveryScore} colorClassName="bg-brand-green" />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch">
          <button
            type="button"
            onClick={onTogglePreview}
            aria-pressed={isPlaying}
            className={cn(
              "flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-colors sm:w-32",
              isPlaying ? "bg-brand-green text-black" : "bg-surface-3 text-text-primary hover:bg-white/10"
            )}
          >
            {isPlaying ? (
              <>
                <Pause className="size-3.5" />
                <span className="flex items-end gap-0.5">
                  {[0, 1, 2].map((bar) => (
                    <motion.span
                      key={bar}
                      className="w-0.5 rounded-full bg-black"
                      animate={{ height: [3, 10, 3] }}
                      transition={{
                        duration: 0.7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: bar * 0.15,
                      }}
                    />
                  ))}
                </span>
              </>
            ) : (
              <>
                <Play className="size-3.5" />
                Preview
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onToggleSave}
            aria-pressed={isSaved}
            className={cn(
              "flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-colors sm:w-32",
              isSaved
                ? "bg-transparent text-brand-green"
                : "bg-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {isSaved ? <Check className="size-3.5" /> : <Bookmark className="size-3.5" />}
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-3">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary"
        >
          <ChevronDown className={cn("size-3.5 transition-transform", expanded && "rotate-180")} />
          Why this recommendation?
        </button>
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-3 pb-1 pt-1">
                <p className="text-sm leading-relaxed text-text-secondary">{track.explanation}</p>
                <p className="text-xs text-text-tertiary">
                  {RECOMMENDATION_STAGE_DESCRIPTIONS[track.stage]} Familiarity {track.familiarityScore}% ·
                  Discovery {track.discoveryScore}%
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <FeedbackPanel given={feedbackGiven} onFeedback={onFeedback} className="border-t border-border pt-3" />
    </div>
  );
}
