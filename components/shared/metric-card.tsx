import { cn } from "@/lib/utils";
import { TrendBadge } from "./trend-badge";
import type { TrendDirection } from "@/lib/types";

interface MetricCardProps {
  label: string;
  value: string;
  delta: number;
  direction: TrendDirection;
  className?: string;
}

/**
 * Big number, quiet label — no card box, no border. Mirrors the "monthly
 * listeners" treatment: a stat is presented on the surface directly, never
 * boxed, per design-system.md §8.1.
 */
export function MetricCard({ label, value, delta, direction, className }: MetricCardProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </span>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-4xl font-bold tabular-nums text-text-primary sm:text-5xl">
          {value}
        </span>
        <TrendBadge delta={delta} direction={direction} />
      </div>
    </div>
  );
}
