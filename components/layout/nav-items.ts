import { Compass, type LucideIcon, User } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Profile uses in-page anchor / drawer instead of a separate route */
  action?: "profile";
}

export const CONSUMER_NAV_ITEMS: NavItem[] = [
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/discover#profile", label: "Your Profile", icon: User, action: "profile" },
];

/** @deprecated Use CONSUMER_NAV_ITEMS — kept for command palette compatibility */
export const NAV_ITEMS: NavItem[] = CONSUMER_NAV_ITEMS;
