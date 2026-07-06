import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Insight } from "@/lib/types";
import { ThemeTag } from "./theme-tag";
import { ConfidenceBadge } from "./confidence-badge";
import { SparklineChart } from "@/components/charts/sparkline-chart";

interface InsightCardProps {
  insight: Insight;
  footer?: ReactNode;
  className?: string;
}

/**
 * Simplified editorial tile (design-system.md §8.2): surface-2 background,
 * accent dot via ThemeTag, overline label, clamped headline + summary, a
 * metric snapshot with a sparkline, and an optional action footer.
 */
export function InsightCard({ insight, footer, className }: InsightCardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-4 rounded-lg bg-surface-2 p-5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-green">
          Insight
        </span>
        <ConfidenceBadge confidence={insight.confidence} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-text-primary">
          {insight.headline}
        </h3>
        <p className="line-clamp-2 text-sm text-text-secondary">{insight.summary}</p>
        <p className="line-clamp-1 text-xs text-text-tertiary">
          Source: {insight.sourceTags.join(" · ")}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-text-tertiary">{insight.metric.label}</span>
            <span className="text-xl font-bold tabular-nums text-text-primary">
              {insight.metric.value}
            </span>
          </div>
          <div className="w-24">
            <SparklineChart
              data={insight.metric.series}
              color={insight.metric.delta >= 0 ? "var(--status-positive)" : "var(--status-critical)"}
              height={32}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <ThemeTag theme={insight.theme} />
          {footer}
        </div>
      </div>
    </div>
  );
}
