"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Heart, Pause, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RECOMMENDATION_STAGE_LABELS, type DiscoveryTrack } from "@/lib/types";
import { TrackArtwork } from "./track-artwork";
import { FamiliarityDiscoveryIndicator } from "./familiarity-discovery-indicator";

const SWIPE_THRESHOLD = 120;

interface SwipeableRecommendationCardProps {
  track: DiscoveryTrack;
  isPlaying: boolean;
  isSaved: boolean;
  isResolved: boolean;
  onKeep: () => void;
  onSkip: () => void;
  onPreview: () => void;
  className?: string;
}

export function SwipeableRecommendationCard({
  track,
  isPlaying,
  isSaved,
  isResolved,
  onKeep,
  onSkip,
  onPreview,
  className,
}: SwipeableRecommendationCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-8, 0, 8]);
  const leftOpacity = useTransform(x, [-120, -40, 0], [0.2, 0.08, 0]);
  const rightOpacity = useTransform(x, [0, 40, 120], [0, 0.08, 0.2]);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onKeep();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSkip();
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  }

  if (isResolved) {
    return null;
  }

  return (
    <div className={cn("relative flex flex-col gap-3", className)}>
      <p className="text-center text-[11px] font-medium text-text-tertiary">
        <span className="text-text-secondary">← Too Familiar</span>
        <span className="mx-2">·</span>
        <span className="text-text-secondary">Love This →</span>
      </p>

      <div className="relative touch-pan-y">
        <motion.div
          style={{ opacity: leftOpacity }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-start rounded-md bg-status-critical/20 pl-6"
        >
          <span className="text-sm font-bold text-text-primary">Too Familiar</span>
        </motion.div>
        <motion.div
          style={{ opacity: rightOpacity }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-end rounded-md bg-brand-green/20 pr-6"
        >
          <span className="text-sm font-bold text-text-primary">Love This</span>
        </motion.div>

        <motion.article
          drag="x"
          dragConstraints={{ left: -160, right: 160 }}
          dragElastic={0.85}
          style={{ x, rotate }}
          onDragEnd={handleDragEnd}
          className={cn(
            "discover-card-interactive relative z-10 flex cursor-grab flex-col gap-5 active:cursor-grabbing",
            isPlaying && "ring-1 ring-brand-green/30"
          )}
        >
          <span className="discover-overline-accent">{RECOMMENDATION_STAGE_LABELS[track.stage]}</span>

          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <TrackArtwork
              stage={track.stage}
              artist={track.artist}
              artworkUrl={track.artworkUrl}
              alt={`${track.trackTitle} by ${track.artist}`}
              isPlaying={isPlaying}
              className="size-40 sm:size-48"
            />

            <div className="flex min-w-0 flex-1 flex-col gap-4 text-center sm:text-left">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold leading-snug text-text-primary sm:text-2xl">
                  {track.trackTitle}
                </h3>
                <p className="text-sm text-text-secondary">{track.artist}</p>
                <p className="text-[13px] text-text-tertiary">
                  {track.genre} · {track.year}
                </p>
              </div>

              <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
                {track.explanation}
              </p>

              <FamiliarityDiscoveryIndicator
                familiarity={track.familiarityScore}
                discovery={track.discoveryScore}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={onSkip}
              aria-label="Skip"
              className="flex size-11 items-center justify-center rounded-full bg-surface-3 text-text-secondary transition-all hover:scale-[1.02] hover:bg-surface-3/90 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
            >
              <X className="size-5" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={onPreview}
              aria-pressed={isPlaying}
              aria-label="Preview"
              className={cn(
                "flex size-12 items-center justify-center rounded-full transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40",
                isPlaying
                  ? "bg-brand-green text-black shadow-[0_0_20px_rgba(29,185,84,0.25)]"
                  : "bg-surface-3 text-text-primary hover:bg-white/10"
              )}
            >
              {isPlaying ? (
                <Pause className="size-5" fill="currentColor" />
              ) : (
                <Play className="size-5" fill="currentColor" />
              )}
            </button>

            <button
              type="button"
              onClick={onKeep}
              aria-pressed={isSaved}
              aria-label="Keep"
              className={cn(
                "flex size-14 items-center justify-center rounded-full transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40",
                isSaved
                  ? "bg-brand-green text-black"
                  : "bg-brand-green text-black hover:bg-brand-green-bright"
              )}
            >
              <Heart className={cn("size-6", isSaved && "fill-current")} strokeWidth={2} />
            </button>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
