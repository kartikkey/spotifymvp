import type { ProductArea, Theme, TrendPoint } from "./common";

export const CONFIDENCE_LEVELS = ["low", "medium", "high"] as const;
export type ConfidenceLevel = (typeof CONFIDENCE_LEVELS)[number];

export interface MetricSnapshot {
  label: string;
  value: string;
  delta: number;
  series: TrendPoint[];
}

export interface Insight {
  id: string;
  headline: string;
  summary: string;
  body: string;
  productArea: ProductArea;
  theme: Theme;
  confidence: ConfidenceLevel;
  sourceTags: string[];
  metric: MetricSnapshot;
  createdAt: string;
  relatedOpportunityId?: string;
  convertedToOpportunity: boolean;
}
