import {
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

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/opportunities", label: "Opportunities", icon: Target },
  { href: "/insights", label: "AI Insights", icon: Sparkles },
  { href: "/experiments", label: "Experiments", icon: FlaskConical },
  { href: "/feedback", label: "Feedback", icon: MessageSquareText },
];
