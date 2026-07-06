"use client";

import { useMemo, useState } from "react";
import { MessageSquareOff, Search } from "lucide-react";
import {
  FEEDBACK_SOURCE_LABELS,
  FEEDBACK_SOURCES,
  SENTIMENTS,
  THEMES,
  THEME_LABELS,
  type FeedbackItem,
  type FeedbackSource,
  type Sentiment,
  type Theme,
  type TrendPoint,
} from "@/lib/types";
import { FilterChip } from "@/components/shared/filter-chip";
import { FeedbackQuoteCard } from "@/components/shared/feedback-quote-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { TrendLineChart } from "@/components/charts/trend-line-chart";
import { TopThemesPanel } from "./top-themes-panel";

const SENTIMENT_LABEL: Record<Sentiment, string> = {
  positive: "Positive",
  neutral: "Neutral",
  negative: "Negative",
};

interface FeedbackBoardProps {
  feedback: FeedbackItem[];
  volumeSeries: TrendPoint[];
}

export function FeedbackBoard({ feedback, volumeSeries }: FeedbackBoardProps) {
  const [query, setQuery] = useState("");
  const [sentiments, setSentiments] = useState<Sentiment[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [sources, setSources] = useState<FeedbackSource[]>([]);

  function toggle<T>(list: T[], setList: (v: T[]) => void, value: T) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const filtered = useMemo(() => {
    let result = feedback;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter((f) => f.text.toLowerCase().includes(q));
    }
    if (sentiments.length) result = result.filter((f) => sentiments.includes(f.sentiment));
    if (themes.length) result = result.filter((f) => themes.includes(f.theme));
    if (sources.length) result = result.filter((f) => sources.includes(f.source));
    return result;
  }, [feedback, query, sentiments, themes, sources]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg bg-surface-1 p-4 sm:p-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Feedback Volume
          </span>
          <TrendLineChart
            data={volumeSeries}
            series={[{ key: "value", label: "Items received", color: "var(--brand-green)" }]}
            className="mt-2 h-56 w-full"
          />
        </div>
        <TopThemesPanel feedback={feedback} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="relative sm:max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-text-tertiary" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search feedback..."
              className="h-8 pl-8"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {SENTIMENTS.map((s) => (
              <FilterChip
                key={s}
                label={SENTIMENT_LABEL[s]}
                active={sentiments.includes(s)}
                onClick={() => toggle(sentiments, setSentiments, s)}
              />
            ))}
            <span className="mx-1 h-4 w-px shrink-0 bg-border" aria-hidden />
            {FEEDBACK_SOURCES.map((s) => (
              <FilterChip
                key={s}
                label={FEEDBACK_SOURCE_LABELS[s]}
                active={sources.includes(s)}
                onClick={() => toggle(sources, setSources, s)}
              />
            ))}
            <span className="mx-1 h-4 w-px shrink-0 bg-border" aria-hidden />
            {THEMES.map((t) => (
              <FilterChip
                key={t}
                label={THEME_LABELS[t]}
                active={themes.includes(t)}
                onClick={() => toggle(themes, setThemes, t)}
              />
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={MessageSquareOff}
            title="No feedback matches these filters"
            description="Try clearing a filter or searching a different term."
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <FeedbackQuoteCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
