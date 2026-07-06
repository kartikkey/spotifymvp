import type { ActivityEntry, ProductArea, Theme } from "./common";

export const OPPORTUNITY_STATUSES = [
  "new",
  "in-review",
  "planned",
  "in-progress",
  "shipped",
] as const;

export type OpportunityStatus = (typeof OPPORTUNITY_STATUSES)[number];

export const OPPORTUNITY_STATUS_LABELS: Record<OpportunityStatus, string> = {
  new: "New",
  "in-review": "In Review",
  planned: "Planned",
  "in-progress": "In Progress",
  shipped: "Shipped",
};

/** Reach/Impact/Confidence/Effort inputs, each 1-10, used to derive riceScore. */
export interface RiceInputs {
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
}

export interface Opportunity {
  id: string;
  title: string;
  summary: string;
  description: string;
  productArea: ProductArea;
  theme: Theme;
  status: OpportunityStatus;
  rice: RiceInputs;
  riceScore: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
  linkedInsightIds: string[];
  linkedFeedbackIds: string[];
  activity: ActivityEntry[];
}
