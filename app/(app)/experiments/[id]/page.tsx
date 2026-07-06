import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CircleCheck, CircleDashed } from "lucide-react";
import { getExperimentById } from "@/lib/api";
import { formatDate, formatPercent } from "@/lib/utils";
import { ProductAreaTag } from "@/components/shared/product-area-tag";
import { ThemeTag } from "@/components/shared/theme-tag";
import { ExperimentStatusPill } from "@/components/shared/status-pill";
import { SectionHeader } from "@/components/shared/section-header";
import { ComparisonAreaChart } from "@/components/charts/comparison-area-chart";

export default async function ExperimentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experiment = await getExperimentById(id);
  if (!experiment) notFound();

  return (
    <>
      <Link
        href="/experiments"
        className="flex w-fit items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Experiments
      </Link>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <ExperimentStatusPill status={experiment.status} />
          <ThemeTag theme={experiment.theme} />
          <ProductAreaTag productArea={experiment.productArea} />
          {experiment.isSignificant ? (
            <span className="flex items-center gap-1 text-xs font-medium text-status-positive">
              <CircleCheck className="size-3.5" />
              Statistically significant
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs font-medium text-text-tertiary">
              <CircleDashed className="size-3.5" />
              Not yet significant
            </span>
          )}
        </div>
        <h1 className="max-w-3xl text-2xl font-bold tracking-tight text-text-primary sm:text-[28px]">
          {experiment.name}
        </h1>
        <p className="max-w-3xl text-sm text-text-secondary">{experiment.hypothesis}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-tertiary">
          <span>
            Owner <span className="text-text-secondary">{experiment.owner}</span>
          </span>
          <span>Started {formatDate(experiment.startDate)}</span>
          {experiment.endDate ? <span>Ended {formatDate(experiment.endDate)}</span> : null}
          <span>{experiment.sampleSize.toLocaleString()} participants</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-8">
          <section>
            <SectionHeader eyebrow={experiment.primaryMetricName} title="Control vs. Treatment" />
            <div className="rounded-lg bg-surface-1 p-4 sm:p-6">
              <ComparisonAreaChart data={experiment.series} className="h-72 w-full" />
            </div>
          </section>

          {experiment.conclusion ? (
            <section>
              <SectionHeader title="Conclusion" />
              <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">
                {experiment.conclusion}
              </p>
            </section>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 rounded-lg bg-surface-2 p-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Result Summary
          </span>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Control</span>
              <span className="text-sm font-semibold tabular-nums text-text-primary">
                {experiment.controlValue}
                {experiment.primaryMetricUnit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Treatment</span>
              <span className="text-sm font-semibold tabular-nums text-text-primary">
                {experiment.treatmentValue}
                {experiment.primaryMetricUnit}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-sm text-text-secondary">Lift</span>
              <span
                className={
                  "text-sm font-bold tabular-nums " +
                  (experiment.liftPercent >= 0 ? "text-status-positive" : "text-status-critical")
                }
              >
                {formatPercent(experiment.liftPercent)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
