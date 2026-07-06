import { cn } from "@/lib/utils";

/**
 * RICE score is the ranking signal on the Opportunities board. Rendered as a
 * plain bold number with a quiet label underneath — same "quiet stat"
 * treatment as MetricCard, just smaller, since it's a supporting number here
 * rather than the dominant element on the view.
 */
export function RiceScore({ score, className }: { score: number; className?: string }) {
  return (
    <div className={cn("flex flex-col items-end gap-0.5", className)}>
      <span className="text-lg font-bold tabular-nums text-text-primary">{score}</span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
        RICE
      </span>
    </div>
  );
}
