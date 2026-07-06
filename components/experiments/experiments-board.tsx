"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FlaskConical, Search } from "lucide-react";
import { EXPERIMENT_STATUSES, EXPERIMENT_STATUS_LABELS, type Experiment, type ExperimentStatus } from "@/lib/types";
import { formatDate, formatPercent } from "@/lib/utils";
import { FilterChip } from "@/components/shared/filter-chip";
import { ProductAreaTag } from "@/components/shared/product-area-tag";
import { ThemeTag } from "@/components/shared/theme-tag";
import { ExperimentStatusPill } from "@/components/shared/status-pill";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ExperimentsBoard({ experiments }: { experiments: Experiment[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [statuses, setStatuses] = useState<ExperimentStatus[]>([]);

  function toggleStatus(status: ExperimentStatus) {
    setStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  }

  const filtered = useMemo(() => {
    let result = experiments;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (e) => e.name.toLowerCase().includes(q) || e.hypothesis.toLowerCase().includes(q)
      );
    }
    if (statuses.length) {
      result = result.filter((e) => statuses.includes(e.status));
    }
    return [...result].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [experiments, query, statuses]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-text-tertiary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search experiments..."
            className="h-8 pl-8"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {EXPERIMENT_STATUSES.map((status) => (
            <FilterChip
              key={status}
              label={EXPERIMENT_STATUS_LABELS[status]}
              active={statuses.includes(status)}
              onClick={() => toggleStatus(status)}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FlaskConical}
          title="No experiments match these filters"
          description="Try clearing a filter or searching a different term."
        />
      ) : (
        <>
        <div className="flex flex-col gap-3 md:hidden">
          {filtered.map((experiment) => (
            <button
              key={experiment.id}
              type="button"
              onClick={() => router.push(`/experiments/${experiment.id}`)}
              className="flex flex-col gap-3 rounded-lg bg-surface-1 p-4 text-left"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium text-text-primary">{experiment.name}</span>
                <span className="line-clamp-1 text-sm text-text-secondary">
                  {experiment.primaryMetricName}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <ThemeTag theme={experiment.theme} />
                  <ExperimentStatusPill status={experiment.status} />
                </div>
                <span
                  className={
                    "text-sm font-semibold tabular-nums " +
                    (experiment.liftPercent >= 0 ? "text-status-positive" : "text-status-critical")
                  }
                >
                  {formatPercent(experiment.liftPercent)}
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="hidden overflow-hidden rounded-lg bg-surface-1 md:block">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Experiment</TableHead>
                <TableHead className="hidden lg:table-cell">Product Area</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Lift</TableHead>
                <TableHead className="hidden text-right sm:table-cell">Sample Size</TableHead>
                <TableHead className="hidden text-right md:table-cell">Started</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((experiment) => (
                <TableRow
                  key={experiment.id}
                  tabIndex={0}
                  role="link"
                  aria-label={`Open experiment: ${experiment.name}`}
                  className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => router.push(`/experiments/${experiment.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/experiments/${experiment.id}`);
                    }
                  }}
                >
                  <TableCell className="max-w-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="truncate font-medium text-text-primary">{experiment.name}</span>
                      <span className="line-clamp-1 text-xs text-text-secondary">
                        {experiment.primaryMetricName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <ProductAreaTag productArea={experiment.productArea} />
                  </TableCell>
                  <TableCell>
                    <ExperimentStatusPill status={experiment.status} />
                  </TableCell>
                  <TableCell
                    className={
                      "text-right font-semibold tabular-nums " +
                      (experiment.liftPercent >= 0 ? "text-status-positive" : "text-status-critical")
                    }
                  >
                    {formatPercent(experiment.liftPercent)}
                  </TableCell>
                  <TableCell className="hidden text-right text-text-secondary tabular-nums sm:table-cell">
                    {experiment.sampleSize.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden text-right text-xs text-text-tertiary md:table-cell">
                    {formatDate(experiment.startDate)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        </>
      )}
    </div>
  );
}
