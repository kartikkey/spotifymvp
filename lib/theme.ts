import type { AccentToken } from "@/lib/types";

/** Categorical accent tokens resolved to their CSS variable, for chart series colors. */
export const ACCENT_COLOR_VAR: Record<AccentToken, string> = {
  blue: "var(--accent-blue)",
  purple: "var(--accent-purple)",
  orange: "var(--accent-orange)",
  pink: "var(--accent-pink)",
  gold: "var(--accent-gold)",
};
