import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDashboardMetrics, getEngagementSeries, getLatestInsights, getTopOpportunities } from "@/lib/api";
import { PRODUCT_AREA_ACCENT, PRODUCT_AREA_LABELS, PRODUCT_AREAS } from "@/lib/types";
import { ACCENT_COLOR_VAR } from "@/lib/theme";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/shared/section-header";
import { MetricCard } from "@/components/shared/metric-card";
import { OpportunityCard } from "@/components/shared/opportunity-card";
import { InsightCard } from "@/components/shared/insight-card";
import { TrendLineChart } from "@/components/charts/trend-line-chart";

export default async function DashboardPage() {
  const [metrics, engagementSeries, topOpportunities, latestInsights] = await Promise.all([
    getDashboardMetrics(),
    getEngagementSeries(),
    getTopOpportunities(3),
    getLatestInsights(3),
  ]);

  const engagementConfig = PRODUCT_AREAS.map((area) => ({
    key: area,
    label: PRODUCT_AREA_LABELS[area],
    color: ACCENT_COLOR_VAR[PRODUCT_AREA_ACCENT[area]],
  }));

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Product Overview"
        description="A cross-product read on engagement, retention, and where the biggest opportunities sit this quarter."
      />

      <section className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            delta={metric.delta}
            direction={metric.direction}
          />
        ))}
      </section>

      <section>
        <SectionHeader eyebrow="6-Month Trend" title="Engagement by Product Area" />
        <div className="rounded-lg bg-surface-1 p-4 sm:p-6">
          <TrendLineChart data={engagementSeries} series={engagementConfig} className="h-72 w-full" />
        </div>
      </section>

      <section>
        <SectionHeader
          title="Top Opportunities"
          action={
            <Link
              href="/opportunities"
              className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary"
            >
              View all
              <ArrowRight className="size-3.5" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {topOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Latest AI Insights"
          action={
            <Link
              href="/insights"
              className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary"
            >
              View all
              <ArrowRight className="size-3.5" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {latestInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>
    </>
  );
}
