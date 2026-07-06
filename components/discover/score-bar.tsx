import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  value: number;
  colorClassName: string;
  className?: string;
}

export function ScoreBar({ label, value, colorClassName, className }: ScoreBarProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-text-tertiary">{label}</span>
        <span className="text-[11px] font-semibold tabular-nums text-text-secondary">{value}</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-surface-3">
        <div
          className={cn("h-full rounded-full transition-all duration-500", colorClassName)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
