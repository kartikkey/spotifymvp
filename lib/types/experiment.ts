import type { ProductArea, Theme } from "./common";

export const EXPERIMENT_STATUSES = [
  "running",
  "completed",
  "ready-to-ship",
  "killed",
] as const;

export type ExperimentStatus = (typeof EXPERIMENT_STATUSES)[number];

export const EXPERIMENT_STATUS_LABELS: Record<ExperimentStatus, string> = {
  running: "Running",
  completed: "Completed",
  "ready-to-ship": "Ready to Ship",
  killed: "Killed",
};

export interface ExperimentSeriesPoint {
  date: string;
  control: number;
  treatment: number;
}

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  productArea: ProductArea;
  theme: Theme;
  status: ExperimentStatus;
  primaryMetricName: string;
  primaryMetricUnit: string;
  controlValue: number;
  treatmentValue: number;
  liftPercent: number;
  isSignificant: boolean;
  sampleSize: number;
  startDate: string;
  endDate?: string;
  conclusion?: string;
  series: ExperimentSeriesPoint[];
  owner: string;
}
