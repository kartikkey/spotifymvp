import { Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCENT_COLOR_VAR } from "@/lib/theme";
import { RECOMMENDATION_STAGE_ARTWORK, type RecommendationStage } from "@/lib/types";

interface TrackArtworkProps {
  stage: RecommendationStage;
  className?: string;
}

/**
 * Stylized artwork tile in place of photography (design-system.md §8.2 —
 * simplified editorial tile, no photography). A two-accent gradient keyed to
 * the journey stage stands in for album art without depending on external
 * image assets.
 */
export function TrackArtwork({ stage, className }: TrackArtworkProps) {
  const [from, to] = RECOMMENDATION_STAGE_ARTWORK[stage];

  return (
    <div
      className={cn("flex shrink-0 items-center justify-center rounded-md", className)}
      style={{
        background: `linear-gradient(135deg, ${ACCENT_COLOR_VAR[from]}, ${ACCENT_COLOR_VAR[to]})`,
      }}
    >
      <Music className="size-1/3 text-black/30" strokeWidth={1.75} />
    </div>
  );
}
