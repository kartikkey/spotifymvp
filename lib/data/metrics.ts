import type { DashboardMetric, EngagementSeriesPoint } from "@/lib/types";

const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "metric-mau",
    label: "Premium Monthly Active Users",
    value: "281.4M",
    rawValue: 281400000,
    delta: 2.1,
    direction: "up",
    series: [
      { date: "Feb", value: 268.9 },
      { date: "Mar", value: 271.5 },
      { date: "Apr", value: 274.2 },
      { date: "May", value: 276.8 },
      { date: "Jun", value: 279.3 },
      { date: "Jul", value: 281.4 },
    ],
  },
  {
    id: "metric-podcast-listeners",
    label: "Weekly Podcast Listeners",
    value: "182.6M",
    rawValue: 182600000,
    delta: 4.6,
    direction: "up",
    series: [
      { date: "Feb", value: 162.1 },
      { date: "Mar", value: 167.8 },
      { date: "Apr", value: 172.0 },
      { date: "May", value: 176.4 },
      { date: "Jun", value: 179.9 },
      { date: "Jul", value: 182.6 },
    ],
  },
  {
    id: "metric-dj-adoption",
    label: "DJ Feature Adoption",
    value: "37.2%",
    rawValue: 37.2,
    delta: 6.8,
    direction: "up",
    series: [
      { date: "Feb", value: 24.5 },
      { date: "Mar", value: 27.9 },
      { date: "Apr", value: 30.8 },
      { date: "May", value: 33.1 },
      { date: "Jun", value: 35.4 },
      { date: "Jul", value: 37.2 },
    ],
  },
  {
    id: "metric-retention",
    label: "90-Day Premium Retention",
    value: "83.4%",
    rawValue: 83.4,
    delta: -1.2,
    direction: "down",
    series: [
      { date: "Feb", value: 85.1 },
      { date: "Mar", value: 84.9 },
      { date: "Apr", value: 84.3 },
      { date: "May", value: 84.0 },
      { date: "Jun", value: 83.7 },
      { date: "Jul", value: 83.4 },
    ],
  },
];

/**
 * Engagement index (0-100, normalized weekly active usage relative to each
 * area's Jan baseline) across the five tracked product areas. Backs the
 * primary dashboard trend chart.
 */
export const engagementSeries: EngagementSeriesPoint[] = MONTHS.map((date, i) => ({
  date,
  "home-discovery": [100, 101, 99, 102, 104, 103][i],
  podcasts: [100, 104, 109, 114, 119, 124][i],
  dj: [100, 118, 132, 145, 156, 168][i],
  "live-events": [100, 103, 108, 112, 121, 126][i],
  "premium-monetization": [100, 99, 101, 100, 102, 103][i],
}));

export const ENGAGEMENT_SERIES_LABELS: Record<string, string> = {
  "home-discovery": "Home & Discovery",
  podcasts: "Podcasts",
  dj: "DJ",
  "live-events": "Live Events",
  "premium-monetization": "Premium & Monetization",
};
