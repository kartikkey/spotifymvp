"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { THEMES, type Insight, type Theme } from "@/lib/types";
import { THEME_LABELS } from "@/lib/types";
import { FilterChip } from "@/components/shared/filter-chip";
import { InsightCard } from "@/components/shared/insight-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { TurnIntoOpportunityButton } from "./turn-into-opportunity-button";

export function InsightsFeed({ insights }: { insights: Insight[] }) {
  const [query, setQuery] = useState("");
  const [themes, setThemes] = useState<Theme[]>([]);

  function toggleTheme(theme: Theme) {
    setThemes((prev) => (prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]));
  }

  const filtered = useMemo(() => {
    let result = insights;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (i) => i.headline.toLowerCase().includes(q) || i.summary.toLowerCase().includes(q)
      );
    }
    if (themes.length) {
      result = result.filter((i) => themes.includes(i.theme));
    }
    return result;
  }, [insights, query, themes]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-text-tertiary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search insights..."
            className="h-8 pl-8"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {THEMES.map((theme) => (
            <FilterChip
              key={theme}
              label={THEME_LABELS[theme]}
              active={themes.includes(theme)}
              onClick={() => toggleTheme(theme)}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="No insights match these filters"
          description="Try clearing a filter or searching a different term."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              footer={
                <TurnIntoOpportunityButton
                  headline={insight.headline}
                  convertedToOpportunity={insight.convertedToOpportunity}
                  relatedOpportunityId={insight.relatedOpportunityId}
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
