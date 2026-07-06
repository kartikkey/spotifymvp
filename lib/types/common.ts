export const PRODUCT_AREAS = [
  "home-discovery",
  "podcasts",
  "dj",
  "live-events",
  "premium-monetization",
] as const;

export type ProductArea = (typeof PRODUCT_AREAS)[number];

export const PRODUCT_AREA_LABELS: Record<ProductArea, string> = {
  "home-discovery": "Home & Discovery",
  podcasts: "Podcasts",
  dj: "DJ",
  "live-events": "Live Events",
  "premium-monetization": "Premium & Monetization",
};

export const THEMES = [
  "retention",
  "discovery",
  "engagement",
  "monetization",
  "platform",
] as const;

export type Theme = (typeof THEMES)[number];

export const THEME_LABELS: Record<Theme, string> = {
  retention: "Retention",
  discovery: "Discovery",
  engagement: "Engagement",
  monetization: "Monetization",
  platform: "Platform",
};

export type AccentToken = "blue" | "purple" | "orange" | "pink" | "gold";

/** Maps each theme to one of the design system's categorical accent tokens. */
export const THEME_ACCENT: Record<Theme, AccentToken> = {
  discovery: "blue",
  platform: "purple",
  monetization: "gold",
  engagement: "pink",
  retention: "orange",
};

/** Maps each product area to one of the design system's categorical accent tokens. */
export const PRODUCT_AREA_ACCENT: Record<ProductArea, AccentToken> = {
  "home-discovery": "blue",
  podcasts: "purple",
  dj: "gold",
  "live-events": "pink",
  "premium-monetization": "orange",
};

export interface TrendPoint {
  date: string;
  value: number;
}

export type TrendDirection = "up" | "down" | "flat";

export interface ActivityEntry {
  id: string;
  type: "created" | "status-change" | "comment";
  author: string;
  timestamp: string;
  message: string;
  fromStatus?: string;
  toStatus?: string;
}
