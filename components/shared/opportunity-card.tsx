import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Opportunity } from "@/lib/types";
import { ThemeTag } from "./theme-tag";
import { OpportunityStatusPill } from "./status-pill";
import { RiceScore } from "./rice-score";

interface OpportunityCardProps {
  opportunity: Opportunity;
  className?: string;
}

/**
 * The "act on this" card (design-system.md §8.3) — the one card type allowed
 * to outrank its neighbors, signaled by the brand-green left accent bar
 * rather than by size or extra color.
 */
export function OpportunityCard({ opportunity, className }: OpportunityCardProps) {
  return (
    <Link
      href={`/opportunities/${opportunity.id}`}
      className={cn(
        "group flex h-full flex-col gap-4 rounded-lg border-l-4 border-brand-green bg-surface-2 p-5 transition-colors hover:bg-surface-3",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-green">
          Opportunity
        </span>
        <RiceScore score={opportunity.riceScore} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-text-primary">
          {opportunity.title}
        </h3>
        <p className="line-clamp-2 text-sm text-text-secondary">{opportunity.summary}</p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
        <ThemeTag theme={opportunity.theme} />
        <OpportunityStatusPill status={opportunity.status} />
      </div>
    </Link>
  );
}
