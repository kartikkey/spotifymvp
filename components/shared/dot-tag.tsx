import { cn } from "@/lib/utils";

export type DotColor =
  | "blue"
  | "purple"
  | "orange"
  | "pink"
  | "gold"
  | "green"
  | "amber"
  | "red"
  | "gray";

const DOT_COLOR_CLASSES: Record<DotColor, string> = {
  blue: "bg-accent-blue",
  purple: "bg-accent-purple",
  orange: "bg-accent-orange",
  pink: "bg-accent-pink",
  gold: "bg-accent-gold",
  green: "bg-status-positive",
  amber: "bg-status-warning",
  red: "bg-status-critical",
  gray: "bg-text-tertiary",
};

interface DotTagProps {
  label: string;
  color: DotColor;
  className?: string;
}

/**
 * Informational pill: colored dot + label, no fill. Used for status,
 * sentiment, theme, and product-area taxonomy — quieter than an interactive
 * filter chip, per design-system.md §9.
 */
export function DotTag({ label, color, className }: DotTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary",
        className
      )}
    >
      <span className={cn("size-1.5 shrink-0 rounded-full", DOT_COLOR_CLASSES[color])} aria-hidden />
      {label}
    </span>
  );
}
