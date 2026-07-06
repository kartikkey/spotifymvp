"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCENT_COLOR_VAR } from "@/lib/theme";
import { RECOMMENDATION_STAGE_ARTWORK, type RecommendationStage } from "@/lib/types";

interface TrackArtworkProps {
  stage: RecommendationStage;
  artist?: string;
  artworkUrl?: string;
  alt?: string;
  isPlaying?: boolean;
  className?: string;
}

export function TrackArtwork({
  stage,
  artist,
  artworkUrl,
  alt,
  isPlaying,
  className,
}: TrackArtworkProps) {
  const [from, to] = RECOMMENDATION_STAGE_ARTWORK[stage];
  const initial = artist?.charAt(0).toUpperCase() ?? null;
  const imageAlt = alt ?? (artist ? `${artist} artwork` : "Track artwork");

  return (
    <div
      className={cn(
        "group/art relative flex shrink-0 items-center justify-center overflow-hidden rounded-md shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] transition-transform duration-300 group-hover/card:scale-[1.02]",
        isPlaying && "ring-2 ring-brand-green/50",
        className
      )}
      style={
        artworkUrl
          ? undefined
          : {
              background: `linear-gradient(145deg, ${ACCENT_COLOR_VAR[from]} 0%, ${ACCENT_COLOR_VAR[to]} 100%)`,
            }
      }
    >
      {artworkUrl ? (
        <Image
          src={artworkUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 160px, 192px"
          className="object-cover"
        />
      ) : initial ? (
        <span className="text-2xl font-bold text-black/25 sm:text-3xl">{initial}</span>
      ) : (
        <Music className="size-1/3 text-black/30" strokeWidth={1.75} />
      )}
      {isPlaying ? (
        <motion.div
          className="absolute inset-0 bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      ) : null}
    </div>
  );
}
