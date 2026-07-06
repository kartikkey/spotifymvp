"use client";

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Check, Heart, MoreHorizontal, Pause, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RECOMMENDATION_STAGE_TAGS, type DiscoveryTrack, type RecommendationStage } from "@/lib/types";
import { TrackArtwork } from "./track-artwork";

const SWIPE_THRESHOLD = 100;

function scoreBadge(stage: RecommendationStage, track: DiscoveryTrack) {
  if (stage === "hidden-gem") {
    return { label: `Hidden ${track.discoveryScore}%`, className: "bg-accent-orange/15 text-accent-orange" };
  }
  if (stage === "emerging-artist" || stage === "genre-expansion") {
    return { label: `New ${track.discoveryScore}%`, className: "bg-accent-purple/15 text-accent-purple" };
  }
  return { label: `Familiar ${track.familiarityScore}%`, className: "bg-brand-green/15 text-brand-green" };
}

function shortReason(track: DiscoveryTrack): string {
  const first = track.explanation.split(/[.—]/)[0]?.trim();
  if (first && first.length < 80) return `${first}.`;
  return track.explanation.slice(0, 72).trim() + "…";
}

interface JourneyTrackCardProps {
  track: DiscoveryTrack;
  stepIndex: number;
  isPlaying: boolean;
  isSaved: boolean;
  isResolved: boolean;
  isActive: boolean;
  onKeep: () => void;
  onSkip: () => void;
  onPreview: () => void;
}

export function JourneyTrackCard({
  track,
  stepIndex,
  isPlaying,
  isSaved,
  isResolved,
  isActive,
  onKeep,
  onSkip,
  onPreview,
}: JourneyTrackCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-160, 0, 160], [-4, 0, 4]);
  const leftOpacity = useTransform(x, [-100, -30, 0], [0.18, 0.06, 0]);
  const rightOpacity = useTransform(x, [0, 30, 100], [0, 0.06, 0.18]);
  const badge = scoreBadge(track.stage, track);

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (!isActive || isResolved) return;
    if (info.offset.x > SWIPE_THRESHOLD) onKeep();
    else if (info.offset.x < -SWIPE_THRESHOLD) onSkip();
    else animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
  }

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center pt-5">
        <div
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
            isResolved ? "bg-brand-green text-black" : isActive ? "bg-brand-green text-black" : "bg-surface-3 text-text-tertiary"
          )}
        >
          {isResolved ? <Check className="size-3.5" strokeWidth={2.5} /> : stepIndex + 1}
        </div>
        {stepIndex < 4 ? <div className="my-1 w-px flex-1 bg-border/80" aria-hidden /> : null}
      </div>

      <div className="relative min-w-0 flex-1 pb-6">
        {isActive && !isResolved ? (
          <>
            <motion.div
              style={{ opacity: leftOpacity }}
              className="pointer-events-none absolute inset-0 z-0 flex items-center rounded-md bg-status-critical/10 pl-4"
            >
              <span className="text-xs font-semibold text-text-secondary">Too Familiar</span>
            </motion.div>
            <motion.div
              style={{ opacity: rightOpacity }}
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-end rounded-md bg-brand-green/10 pr-4"
            >
              <span className="text-xs font-semibold text-text-secondary">Love This</span>
            </motion.div>
          </>
        ) : null}

        <motion.article
          drag={isActive && !isResolved ? "x" : false}
          dragConstraints={{ left: -140, right: 140 }}
          dragElastic={0.85}
          style={isActive && !isResolved ? { x, rotate } : undefined}
          onDragEnd={handleDragEnd}
          className={cn(
            "group/card relative z-10 flex gap-4 rounded-md bg-surface-2 p-4 transition-colors",
            isActive && !isResolved && "cursor-grab active:cursor-grabbing",
            isResolved && "opacity-55",
            isPlaying && "ring-1 ring-brand-green/40",
            !isResolved && isActive && "hover:bg-surface-3/60"
          )}
        >
          <button type="button" onClick={onPreview} className="relative shrink-0">
            <TrackArtwork stage={track.stage} artist={track.artist} isPlaying={isPlaying} className="size-16" />
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-md bg-black/40 opacity-0 transition-opacity group-hover/card:opacity-100",
                isPlaying && "opacity-100"
              )}
            >
              {isPlaying ? (
                <Pause className="size-5 fill-white text-white" />
              ) : (
                <Play className="size-5 fill-white text-white" />
              )}
            </span>
          </button>

          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="discover-overline-accent text-[10px]">{RECOMMENDATION_STAGE_TAGS[track.stage]}</span>
            <div className="flex flex-col gap-0.5">
              <h3 className="truncate text-base font-bold text-text-primary">{track.trackTitle}</h3>
              <p className="truncate text-sm text-text-secondary">{track.artist}</p>
              <p className="text-xs text-text-tertiary">
                {track.genre} · {track.year}
              </p>
            </div>
            <p className="line-clamp-2 text-xs leading-relaxed text-text-tertiary">{shortReason(track)}</p>
          </div>

          <div className="flex shrink-0 flex-col items-end justify-between gap-2">
            <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold tabular-nums", badge.className)}>
              {badge.label}
            </span>
            <div className="flex items-center gap-1">
              {isActive && !isResolved ? (
                <>
                  <button
                    type="button"
                    onClick={onSkip}
                    aria-label="Skip"
                    className="flex size-8 items-center justify-center rounded-full text-text-tertiary hover:bg-surface-3 hover:text-text-primary"
                  >
                    <X className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onKeep}
                    aria-label="Keep"
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full",
                      isSaved ? "text-brand-green" : "text-text-tertiary hover:bg-surface-3 hover:text-brand-green"
                    )}
                  >
                    <Heart className={cn("size-4", isSaved && "fill-current")} />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onPreview}
                  aria-label="Preview"
                  className="flex size-8 items-center justify-center rounded-full text-text-tertiary hover:bg-surface-3 hover:text-text-primary"
                >
                  <Play className="size-4 fill-current" />
                </button>
              )}
              <button
                type="button"
                aria-label="More options"
                className="flex size-8 items-center justify-center rounded-full text-text-tertiary hover:bg-surface-3 hover:text-text-primary"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>
          </div>
        </motion.article>

        {isActive && !isResolved ? (
          <p className="mt-2 text-center text-[10px] font-medium text-text-tertiary">
            ← Too Familiar · Love This →
          </p>
        ) : null}
      </div>
    </div>
  );
}
