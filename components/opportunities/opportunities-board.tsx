"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Inbox, Search } from "lucide-react";
import {
  OPPORTUNITY_STATUSES,
  THEMES,
  type Opportunity,
  type OpportunityStatus,
  type Theme,
} from "@/lib/types";
import { OPPORTUNITY_STATUS_LABELS, THEME_LABELS } from "@/lib/types";
import { formatRelativeTime } from "@/lib/utils";
import { FilterChip } from "@/components/shared/filter-chip";
import { ThemeTag } from "@/components/shared/theme-tag";
import { ProductAreaTag } from "@/components/shared/product-area-tag";
import { OpportunityStatusPill } from "@/components/shared/status-pill";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SortKey = "rice" | "updated";

export function OpportunitiesBoard({ opportunities }: { opportunities: Opportunity[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [themes, setThemes] = useState<Theme[]>([]);
  const [statuses, setStatuses] = useState<OpportunityStatus[]>([]);
  const [sort, setSort] = useState<SortKey>("rice");

  function toggleTheme(theme: Theme) {
    setThemes((prev) => (prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]));
  }

  function toggleStatus(status: OpportunityStatus) {
    setStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  }

  const filtered = useMemo(() => {
    let result = opportunities;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (o) => o.title.toLowerCase().includes(q) || o.summary.toLowerCase().includes(q)
      );
    }
    if (themes.length) {
      result = result.filter((o) => themes.includes(o.theme));
    }
    if (statuses.length) {
      result = result.filter((o) => statuses.includes(o.status));
    }
    return [...result].sort((a, b) => {
      if (sort === "rice") return b.riceScore - a.riceScore;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [opportunities, query, themes, statuses, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-text-tertiary" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search opportunities..."
              className="h-8 pl-8"
            />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="h-8 w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rice">Sort by RICE score</SelectItem>
              <SelectItem value="updated">Sort by recently updated</SelectItem>
            </SelectContent>
          </Select>
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
          <span className="mx-1 h-4 w-px shrink-0 bg-border" aria-hidden />
          {OPPORTUNITY_STATUSES.map((status) => (
            <FilterChip
              key={status}
              label={OPPORTUNITY_STATUS_LABELS[status]}
              active={statuses.includes(status)}
              onClick={() => toggleStatus(status)}
            />
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No opportunities match these filters"
          description="Try clearing a filter or searching a different term."
        />
      ) : (
        <>
        <div className="flex flex-col gap-3 md:hidden">
          {filtered.map((opportunity) => (
            <button
              key={opportunity.id}
              type="button"
              onClick={() => router.push(`/opportunities/${opportunity.id}`)}
              className="flex flex-col gap-3 rounded-lg bg-surface-1 p-4 text-left"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium text-text-primary">{opportunity.title}</span>
                <span className="line-clamp-2 text-sm text-text-secondary">{opportunity.summary}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <ThemeTag theme={opportunity.theme} />
                  <OpportunityStatusPill status={opportunity.status} />
                </div>
                <span className="text-sm font-semibold tabular-nums text-text-primary">
                  {opportunity.riceScore}
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="hidden overflow-hidden rounded-lg bg-surface-1 md:block">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Opportunity</TableHead>
                <TableHead className="hidden lg:table-cell">Product Area</TableHead>
                <TableHead className="hidden md:table-cell">Theme</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">RICE</TableHead>
                <TableHead className="hidden text-right sm:table-cell">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((opportunity) => (
                <TableRow
                  key={opportunity.id}
                  tabIndex={0}
                  role="link"
                  aria-label={`Open opportunity: ${opportunity.title}`}
                  className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  onClick={() => router.push(`/opportunities/${opportunity.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/opportunities/${opportunity.id}`);
                    }
                  }}
                >
                  <TableCell className="max-w-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="truncate font-medium text-text-primary">
                        {opportunity.title}
                      </span>
                      <span className="line-clamp-1 text-xs text-text-secondary">
                        {opportunity.summary}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <ProductAreaTag productArea={opportunity.productArea} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <ThemeTag theme={opportunity.theme} />
                  </TableCell>
                  <TableCell>
                    <OpportunityStatusPill status={opportunity.status} />
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums text-text-primary">
                    {opportunity.riceScore}
                  </TableCell>
                  <TableCell className="hidden text-right text-xs text-text-tertiary sm:table-cell">
                    {formatRelativeTime(opportunity.updatedAt)}
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
