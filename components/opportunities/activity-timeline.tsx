import { formatDate } from "@/lib/utils";
import type { ActivityEntry } from "@/lib/types";

export function ActivityTimeline({ activity }: { activity: ActivityEntry[] }) {
  const sorted = [...activity].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <ol className="flex flex-col gap-4">
      {sorted.map((entry, i) => (
        <li key={entry.id} className="relative flex gap-3 pl-0.5">
          <div className="relative flex w-3 shrink-0 flex-col items-center">
            <span
              className={
                "mt-1.5 size-1.5 shrink-0 rounded-full " +
                (entry.type === "status-change" ? "bg-brand-green" : "bg-text-tertiary")
              }
            />
            {i < sorted.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
          </div>
          <div className="flex flex-col gap-0.5 pb-1">
            <p className="text-sm text-text-primary">{entry.message}</p>
            <p className="text-xs text-text-tertiary">
              {entry.author} &middot; {formatDate(entry.timestamp)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
