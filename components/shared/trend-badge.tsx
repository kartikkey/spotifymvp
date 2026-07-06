import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn, formatPercent } from "@/lib/utils";
import type { TrendDirection } from "@/lib/types";

const DIRECTION_ICON = {
  up: ArrowUp,
  down: ArrowDown,
  flat: Minus,
} as const;

const DIRECTION_CLASSES: Record<TrendDirection, string> = {
  up: "text-status-positive",
  down: "text-status-critical",
  flat: "text-text-tertiary",
};

export function TrendBadge({
  delta,
  direction,
  className,
}: {
  delta: number;
  direction: TrendDirection;
  className?: string;
}) {
  const Icon = DIRECTION_ICON[direction];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-sm font-semibold tabular-nums",
        DIRECTION_CLASSES[direction],
        className
      )}
    >
      <Icon className="size-3.5" strokeWidth={2.5} />
      {formatPercent(Math.abs(delta), { showSign: false })}
    </span>
  );
}
