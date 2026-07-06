import { THEMES, THEME_ACCENT, THEME_LABELS, type FeedbackItem } from "@/lib/types";

export function TopThemesPanel({ feedback }: { feedback: FeedbackItem[] }) {
  const counts = THEMES.map((theme) => ({
    theme,
    count: feedback.filter((f) => f.theme === theme).length,
  })).sort((a, b) => b.count - a.count);

  const max = Math.max(...counts.map((c) => c.count), 1);

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-surface-1 p-5">
      <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
        Top Themes
      </span>
      <div className="flex flex-col gap-3">
        {counts.map(({ theme, count }) => (
          <div key={theme} className="flex items-center gap-3">
            <span className="w-36 shrink-0 truncate text-sm text-text-secondary">
              {THEME_LABELS[theme]}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(count / max) * 100}%`,
                  backgroundColor: `var(--accent-${THEME_ACCENT[theme]})`,
                }}
              />
            </div>
            <span className="w-6 shrink-0 text-right text-sm font-semibold tabular-nums text-text-primary">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
