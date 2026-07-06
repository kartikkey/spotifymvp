"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FamiliarityDiscoveryIndicatorProps {
  familiarity: number;
  discovery: number;
  className?: string;
}

export function FamiliarityDiscoveryIndicator({
  familiarity,
  discovery,
  className,
}: FamiliarityDiscoveryIndicatorProps) {
  const label =
    familiarity >= 70 ? "Mostly familiar" : discovery >= 60 ? "New to you" : "Balanced mix";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-text-tertiary">{label}</span>
        <span className="text-[11px] tabular-nums text-text-tertiary">
          {familiarity}% familiar · {discovery}% new
        </span>
      </div>
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
        <motion.div
          className="h-full bg-accent-blue"
          initial={{ width: 0 }}
          animate={{ width: `${familiarity}%` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          className="h-full bg-brand-green"
          initial={{ width: 0 }}
          animate={{ width: `${discovery}%` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
        />
      </div>
    </div>
  );
}
