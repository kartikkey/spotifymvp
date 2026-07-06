import { Star } from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import { FEEDBACK_SOURCE_LABELS, type FeedbackItem } from "@/lib/types";
import { SentimentPill } from "./status-pill";

export function FeedbackQuoteCard({ item, className }: { item: FeedbackItem; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2 rounded-lg bg-surface-2 p-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-text-tertiary">
          <span className="font-medium text-text-secondary">{item.author}</span>
          <span aria-hidden>&middot;</span>
          <span>{FEEDBACK_SOURCE_LABELS[item.source]}</span>
          <span aria-hidden>&middot;</span>
          <span>{formatRelativeTime(item.createdAt)}</span>
        </div>
        <SentimentPill sentiment={item.sentiment} />
      </div>
      {item.rating ? (
        <div className="flex gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3",
                i < item.rating! ? "fill-status-warning text-status-warning" : "text-text-tertiary"
              )}
            />
          ))}
        </div>
      ) : null}
      <p className="text-sm text-text-secondary">&ldquo;{item.text}&rdquo;</p>
    </div>
  );
}
