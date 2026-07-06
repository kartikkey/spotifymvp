import {
  EXPERIMENT_STATUS_LABELS,
  OPPORTUNITY_STATUS_LABELS,
  type ExperimentStatus,
  type OpportunityStatus,
  type Sentiment,
} from "@/lib/types";
import { DotTag, type DotColor } from "./dot-tag";

const OPPORTUNITY_STATUS_COLOR: Record<OpportunityStatus, DotColor> = {
  new: "gray",
  "in-review": "blue",
  planned: "purple",
  "in-progress": "amber",
  shipped: "green",
};

export function OpportunityStatusPill({
  status,
  className,
}: {
  status: OpportunityStatus;
  className?: string;
}) {
  return (
    <DotTag
      label={OPPORTUNITY_STATUS_LABELS[status]}
      color={OPPORTUNITY_STATUS_COLOR[status]}
      className={className}
    />
  );
}

const EXPERIMENT_STATUS_COLOR: Record<ExperimentStatus, DotColor> = {
  running: "blue",
  completed: "green",
  "ready-to-ship": "green",
  killed: "red",
};

export function ExperimentStatusPill({
  status,
  className,
}: {
  status: ExperimentStatus;
  className?: string;
}) {
  return (
    <DotTag
      label={EXPERIMENT_STATUS_LABELS[status]}
      color={EXPERIMENT_STATUS_COLOR[status]}
      className={className}
    />
  );
}

const SENTIMENT_COLOR: Record<Sentiment, DotColor> = {
  positive: "green",
  neutral: "gray",
  negative: "red",
};

const SENTIMENT_LABEL: Record<Sentiment, string> = {
  positive: "Positive",
  neutral: "Neutral",
  negative: "Negative",
};

export function SentimentPill({
  sentiment,
  className,
}: {
  sentiment: Sentiment;
  className?: string;
}) {
  return (
    <DotTag label={SENTIMENT_LABEL[sentiment]} color={SENTIMENT_COLOR[sentiment]} className={className} />
  );
}
