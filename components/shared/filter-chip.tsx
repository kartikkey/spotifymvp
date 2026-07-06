"use client";

import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

/**
 * Interactive filter pill (design-system.md §9): surface-3 fill at rest,
 * solid brand-green fill + black text when active. Distinct from DotTag,
 * which is informational only.
 */
export function FilterChip({ label, active, onClick, className }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-7 shrink-0 items-center rounded-full px-3 text-xs font-semibold transition-colors",
        active
          ? "bg-brand-green text-black"
          : "bg-surface-3 text-text-secondary hover:text-text-primary",
        className
      )}
    >
      {label}
    </button>
  );
}
