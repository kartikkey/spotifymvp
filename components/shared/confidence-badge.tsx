import { cn } from "@/lib/utils";
import type { ConfidenceLevel } from "@/lib/types";

const CONFIDENCE_CLASSES: Record<ConfidenceLevel, string> = {
  high: "bg-status-positive/15 text-status-positive",
  medium: "bg-status-warning/15 text-status-warning",
  low: "bg-text-tertiary/15 text-text-tertiary",
};

const CONFIDENCE_LABEL: Record<ConfidenceLevel, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};

export function ConfidenceBadge({
  confidence,
  className,
}: {
  confidence: ConfidenceLevel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        CONFIDENCE_CLASSES[confidence],
        className
      )}
    >
      {CONFIDENCE_LABEL[confidence]}
    </span>
  );
}
