import { dashboardMetrics, engagementSeries } from "@/lib/data/metrics";
import type { DashboardMetric, EngagementSeriesPoint } from "@/lib/types";

export async function getDashboardMetrics(): Promise<DashboardMetric[]> {
  return dashboardMetrics;
}

export async function getEngagementSeries(): Promise<EngagementSeriesPoint[]> {
  return engagementSeries;
}
