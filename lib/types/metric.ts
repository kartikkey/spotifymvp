import type { TrendDirection, TrendPoint } from "./common";

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  delta: number;
  direction: TrendDirection;
  series: TrendPoint[];
}

export interface EngagementSeriesPoint {
  date: string;
  [seriesKey: string]: number | string;
}
