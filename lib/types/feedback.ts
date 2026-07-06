import type { ProductArea, Theme } from "./common";

export const FEEDBACK_SOURCES = [
  "app-store",
  "play-store",
  "reddit",
  "support-ticket",
  "twitter",
] as const;

export type FeedbackSource = (typeof FEEDBACK_SOURCES)[number];

export const FEEDBACK_SOURCE_LABELS: Record<FeedbackSource, string> = {
  "app-store": "App Store",
  "play-store": "Google Play",
  reddit: "Reddit",
  "support-ticket": "Support Ticket",
  twitter: "X / Twitter",
};

export const SENTIMENTS = ["positive", "neutral", "negative"] as const;
export type Sentiment = (typeof SENTIMENTS)[number];

export interface FeedbackItem {
  id: string;
  source: FeedbackSource;
  author: string;
  rating?: number;
  text: string;
  sentiment: Sentiment;
  theme: Theme;
  productArea: ProductArea;
  createdAt: string;
}
