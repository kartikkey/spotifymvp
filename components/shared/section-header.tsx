import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  className?: string;
}

/**
 * Loose spacing above, tight below — see design-system.md §7. Left-aligned,
 * no underline or icon; weight and size alone signal "this is a section."
 */
export function SectionHeader({ eyebrow, title, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-end justify-between gap-4", className)}>
      <div className="flex flex-col gap-1">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-lg font-bold text-text-primary sm:text-xl">{title}</h2>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
