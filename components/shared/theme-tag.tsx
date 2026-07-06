import { THEME_ACCENT, THEME_LABELS, type Theme } from "@/lib/types";
import { DotTag } from "./dot-tag";

export function ThemeTag({ theme, className }: { theme: Theme; className?: string }) {
  return <DotTag label={THEME_LABELS[theme]} color={THEME_ACCENT[theme]} className={className} />;
}
