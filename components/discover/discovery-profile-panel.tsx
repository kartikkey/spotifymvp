"use client";

import { motion } from "framer-motion";
import { cn, formatDate } from "@/lib/utils";
import { ACCENT_COLOR_VAR } from "@/lib/theme";
import type { DiscoveryProfile } from "@/lib/types";

interface DiscoveryProfilePanelProps {
  profile: DiscoveryProfile;
  className?: string;
}

export function DiscoveryProfilePanel({ profile, className }: DiscoveryProfilePanelProps) {
  const topGenres = profile.preferredGenres.slice(0, 5);

  return (
    <aside
      id="profile"
      className={cn(
        "discover-card flex flex-col gap-6 bg-surface-2 scroll-mt-8 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="discover-overline-muted">Your taste</span>
        <h2 className="text-lg font-bold text-text-primary">Discovery Profile</h2>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="discover-overline text-text-tertiary">Exploration score</span>
        <motion.span
          key={profile.explorationLevel}
          initial={{ opacity: 0.4, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tabular-nums text-text-primary"
        >
          {profile.explorationLevel}
        </motion.span>
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="discover-overline text-text-tertiary">Comfort vs discovery</span>
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-surface-3">
          <motion.div
            className="h-full bg-accent-blue"
            animate={{ width: `${profile.comfortVsExploration.comfort}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.div
            className="h-full bg-brand-green"
            animate={{ width: `${profile.comfortVsExploration.exploration}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-text-tertiary">
          <span>Comfort</span>
          <span>Discovery</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="discover-overline text-text-tertiary">Favorite genres</span>
        <div className="flex flex-col gap-3">
          {topGenres.map((entry) => (
            <div key={entry.genre} className="flex flex-col gap-1.5">
              <span className="text-xs text-text-secondary">{entry.genre}</span>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: ACCENT_COLOR_VAR[entry.accent] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${entry.weight}%` }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="discover-overline text-text-tertiary">Recent discoveries</span>
        <div className="flex flex-col gap-1">
          {profile.recentlyDiscovered.length === 0 ? (
            <p className="text-xs leading-relaxed text-text-tertiary">
              Keep tracks you love to build your discovery history.
            </p>
          ) : (
            profile.recentlyDiscovered
              .slice()
              .reverse()
              .slice(0, 5)
              .map((entry) => (
                <div
                  key={`${entry.artist}-${entry.discoveredAt}`}
                  className="flex items-center justify-between gap-2 rounded-md px-2 py-2"
                >
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium text-text-primary">{entry.artist}</span>
                    <span className="truncate text-xs text-text-tertiary">{entry.genre}</span>
                  </div>
                  <span className="shrink-0 text-[11px] text-text-tertiary">
                    {formatDate(entry.discoveredAt)}
                  </span>
                </div>
              ))
          )}
        </div>
      </div>
    </aside>
  );
}
