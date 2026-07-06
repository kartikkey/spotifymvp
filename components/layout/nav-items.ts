import {
  Compass,
  FlaskConical,
  LayoutDashboard,
  type LucideIcon,
  MessageSquareText,
  Sparkles,
  Target,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

/**
 * Two worlds, one product: the internal Product Intelligence workspace this
 * app started as, and the consumer-facing AI Discovery experience it now
 * ships alongside. Grouped in the nav so both read as first-class, not one
 * bolted onto the other.
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Consumer Experience",
    items: [{ href: "/discover", label: "Discover", icon: Compass }],
  },
  {
    label: "Product Intelligence",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/opportunities", label: "Opportunities", icon: Target },
      { href: "/insights", label: "AI Insights", icon: Sparkles },
      { href: "/experiments", label: "Experiments", icon: FlaskConical },
      { href: "/feedback", label: "Feedback", icon: MessageSquareText },
    ],
  },
];

export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((group) => group.items);
