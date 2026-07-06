import type { RiceInputs } from "@/lib/types";

const ROWS: { key: keyof RiceInputs; label: string; hint: string }[] = [
  { key: "reach", label: "Reach", hint: "How many users this touches" },
  { key: "impact", label: "Impact", hint: "How much it moves the needle per user" },
  { key: "confidence", label: "Confidence", hint: "How sure we are about reach and impact" },
  { key: "effort", label: "Effort", hint: "Engineering cost, in relative units" },
];

export function RiceBreakdown({ rice, score }: { rice: RiceInputs; score: number }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-surface-2 p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          RICE Score
        </span>
        <span className="text-2xl font-bold tabular-nums text-text-primary">{score}</span>
      </div>
      <div className="flex flex-col gap-3">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-sm text-text-primary">{row.label}</span>
              <span className="text-xs text-text-tertiary">{row.hint}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-3">
                <div
                  className="h-full rounded-full bg-brand-green"
                  style={{ width: `${(rice[row.key] / 10) * 100}%` }}
                />
              </div>
              <span className="w-4 text-right text-sm font-semibold tabular-nums text-text-primary">
                {rice[row.key]}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-text-tertiary">Score = (Reach &times; Impact &times; Confidence) &divide; Effort</p>
    </div>
  );
}
