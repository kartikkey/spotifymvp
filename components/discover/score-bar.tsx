"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  value: number;
  colorClassName: string;
  className?: string;
}

export function ScoreBar({ label, value, colorClassName, className }: ScoreBarProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-text-tertiary">{label}</span>
        <span className="text-[11px] font-semibold tabular-nums text-text-secondary">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
        <motion.div
          className={cn("h-full rounded-full", colorClassName)}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
}
