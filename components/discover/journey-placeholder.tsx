"use client";

import { motion } from "framer-motion";
import { Compass, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { RECOMMENDATION_STAGE_LABELS, RECOMMENDATION_STAGES } from "@/lib/types";

interface JourneyPlaceholderProps {
  className?: string;
}

const STAGE_HINTS = [
  "Your anchor track",
  "One step outward",
  "Rising before mainstream",
  "A deep cut",
  "A new genre, gently",
] as const;

/**
 * Idle-state preview of the five-step journey — gives the empty column
 * purpose before generation and sets expectations for the demo.
 */
export function JourneyPlaceholder({ className }: JourneyPlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("flex flex-col gap-5", className)}
    >
      <div className="flex flex-col gap-1">
        <span className="discover-overline-muted">Explore</span>
        <h2 className="text-lg font-bold text-text-primary sm:text-xl">Your Discovery Journey</h2>
        <p className="text-sm text-text-secondary">
          Five curated steps from what you know to what you&apos;ll love next.
        </p>
      </div>

      <div className="discover-card border border-dashed border-border/60 bg-surface-1/50">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-surface-3">
            <Compass className="size-5 text-text-tertiary" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-text-primary">Ready when you are</p>
            <p className="text-xs text-text-tertiary">
              Set your mood, pick a prompt, and hit generate to start.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-0">
          {RECOMMENDATION_STAGES.map((stage, index) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.08 + index * 0.06, ease: "easeOut" }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-3 text-xs font-bold text-text-tertiary">
                  {index + 1}
                </div>
                {index < RECOMMENDATION_STAGES.length - 1 ? (
                  <div className="my-1 w-px flex-1 bg-border/60" aria-hidden />
                ) : null}
              </div>
              <div className="mb-4 flex flex-1 items-start gap-3 rounded-md bg-surface-2/40 px-3 py-2.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-text-tertiary" strokeWidth={1.75} />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-xs font-semibold text-text-secondary">
                    {RECOMMENDATION_STAGE_LABELS[stage]}
                  </span>
                  <span className="text-[11px] text-text-tertiary">{STAGE_HINTS[index]}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
