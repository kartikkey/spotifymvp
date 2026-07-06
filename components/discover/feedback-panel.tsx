"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FEEDBACK_TYPES, FEEDBACK_LABELS, type FeedbackType } from "@/lib/types";

interface FeedbackPanelProps {
  given: FeedbackType[];
  onFeedback: (type: FeedbackType) => void;
  className?: string;
}

/**
 * Richer-than-thumbs-up feedback (Flow 3 — "teach the AI"). Each chip is
 * independently toggleable so a listener can stack signals like "love this"
 * + "better for gym" on one recommendation.
 */
export function FeedbackPanel({ given, onFeedback, className }: FeedbackPanelProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
        Teach the AI
      </span>
      <div className="flex flex-wrap gap-1.5">
        {FEEDBACK_TYPES.map((type) => {
          const active = given.includes(type);
          return (
            <button
              key={type}
              type="button"
              aria-pressed={active}
              onClick={() => onFeedback(type)}
              className={cn(
                "inline-flex h-7 shrink-0 items-center gap-1 rounded-full px-3 text-xs font-semibold transition-colors",
                active
                  ? "bg-brand-green text-black"
                  : "bg-surface-3 text-text-secondary hover:text-text-primary"
              )}
            >
              {active ? <Check className="size-3" /> : null}
              {FEEDBACK_LABELS[type]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
