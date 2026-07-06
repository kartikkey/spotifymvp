"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FEEDBACK_LABELS, type FeedbackType } from "@/lib/types";

interface FeedbackPanelProps {
  given: FeedbackType[];
  onFeedback: (type: FeedbackType) => void;
  className?: string;
}

const POSITIVE_FEEDBACK: FeedbackType[] = ["love-this", "more-like-this"];
const ADJUSTMENT_FEEDBACK: FeedbackType[] = [
  "too-familiar",
  "too-different",
  "wrong-mood",
  "less-mainstream",
];
const CONTEXT_FEEDBACK: FeedbackType[] = ["better-vocals", "better-for-work", "better-for-gym"];

function FeedbackChip({
  type,
  active,
  onClick,
}: {
  type: FeedbackType;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(active ? "discover-chip-active" : "discover-chip-rest")}
    >
      {active ? <Check className="size-3" strokeWidth={2.5} /> : null}
      {FEEDBACK_LABELS[type]}
    </button>
  );
}

function FeedbackGroup({
  label,
  types,
  given,
  onFeedback,
}: {
  label: string;
  types: FeedbackType[];
  given: FeedbackType[];
  onFeedback: (type: FeedbackType) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-medium text-text-tertiary">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {types.map((type) => (
          <FeedbackChip
            key={type}
            type={type}
            active={given.includes(type)}
            onClick={() => onFeedback(type)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Grouped feedback chips — positive, adjustment, and context signals
 * are visually separated so the row scans faster on narrow viewports.
 */
export function FeedbackPanel({ given, onFeedback, className }: FeedbackPanelProps) {
  return (
    <div className={cn("flex flex-col gap-4 rounded-md bg-surface-1/40 px-4 py-4", className)}>
      <span className="discover-overline-muted">Teach the AI</span>
      <div className="flex flex-col gap-4">
        <FeedbackGroup label="What worked" types={POSITIVE_FEEDBACK} given={given} onFeedback={onFeedback} />
        <FeedbackGroup
          label="What to adjust"
          types={ADJUSTMENT_FEEDBACK}
          given={given}
          onFeedback={onFeedback}
        />
        <FeedbackGroup label="Context" types={CONTEXT_FEEDBACK} given={given} onFeedback={onFeedback} />
      </div>
    </div>
  );
}
