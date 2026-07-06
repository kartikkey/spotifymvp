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
    <article
      className={cn(
        "discover-card-interactive group/card flex flex-col gap-5",
        isPlaying && "ring-1 ring-brand-green/30",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="discover-overline-accent">{RECOMMENDATION_STAGE_LABELS[track.stage]}</span>
        <span className="text-xs font-medium tabular-nums text-text-tertiary">
          {formatDuration(track.durationSec)}
        </span>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <TrackArtwork
          stage={track.stage}
          artist={track.artist}
          artworkUrl={track.artworkUrl}
          alt={`${track.trackTitle} by ${track.artist}`}
          isPlaying={isPlaying}
          className="size-[72px] sm:size-28"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h3 className="truncate text-lg font-bold leading-snug text-text-primary sm:text-xl">
              {track.trackTitle}
            </h3>
            <p className="truncate text-sm text-text-secondary">
              <span className="font-medium text-text-primary">{track.artist}</span>
              <span className="text-text-tertiary"> · </span>
              {track.genre}
            </p>
            {track.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {track.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-3/80 px-2.5 py-0.5 text-[11px] font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <ScoreBar label="Energy" value={track.energy} colorClassName="bg-accent-orange" />
            <ScoreBar label="Familiarity" value={track.familiarityScore} colorClassName="bg-accent-blue" />
            <ScoreBar label="Discovery" value={track.discoveryScore} colorClassName="bg-brand-green" />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch sm:pt-1">
          <button
            type="button"
            onClick={onTogglePreview}
            aria-pressed={isPlaying}
            className={cn(
              "flex h-10 items-center justify-center gap-2 rounded-full px-5 text-xs font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 sm:w-36",
              isPlaying
                ? "bg-brand-green text-black shadow-[0_0_20px_rgba(29,185,84,0.25)]"
                : "bg-surface-3 text-text-primary hover:scale-[1.02] hover:bg-white/10"
            )}
          >
            {isPlaying ? (
              <>
                <Pause className="size-4" fill="currentColor" />
                <span className="flex h-3.5 items-end gap-0.5">
                  {[0, 1, 2].map((bar) => (
                    <motion.span
                      key={bar}
                      className="w-0.5 rounded-full bg-black"
                      animate={{ height: [3, 12, 3] }}
                      transition={{
                        duration: 0.65,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: bar * 0.12,
                      }}
                    />
                  ))}
                </span>
              </>
            ) : (
              <>
                <Play className="size-4" fill="currentColor" />
                Preview
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onToggleSave}
            aria-pressed={isSaved}
            className={cn(
              "flex h-10 items-center justify-center gap-2 rounded-full px-5 text-xs font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 sm:w-36",
              isSaved
                ? "text-brand-green hover:text-brand-green-bright"
                : "text-text-secondary hover:scale-[1.02] hover:text-text-primary"
            )}
          >
            {isSaved ? <Check className="size-4" strokeWidth={2.5} /> : <Bookmark className="size-4" />}
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex w-fit items-center gap-1.5 rounded-md py-1 text-xs font-semibold text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
        >
          <ChevronDown
            className={cn("size-4 transition-transform duration-200", expanded && "rotate-180")}
          />
          Why this recommendation?
        </button>
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2.5 rounded-md bg-surface-1/60 px-4 py-3">
                <p className="text-sm leading-relaxed text-text-secondary">{track.explanation}</p>
                <p className="text-xs leading-relaxed text-text-tertiary">
                  {RECOMMENDATION_STAGE_DESCRIPTIONS[track.stage]} Familiarity {track.familiarityScore}% ·
                  Discovery {track.discoveryScore}%
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <FeedbackPanel given={feedbackGiven} onFeedback={onFeedback} className="pt-1" />
    </article>
  );
}
