"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { ACCENT_COLOR_VAR } from "@/lib/theme";
import type { DiscoveryProfile } from "@/lib/types";

interface DiscoveryProfilePanelProps {
  profile: DiscoveryProfile;
  className?: string;
}

export function DiscoveryProfilePanel({ profile, className }: DiscoveryProfilePanelProps) {
  const sortedEvolution = [...profile.tasteEvolution].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <aside
      className={cn(
        "discover-card flex flex-col gap-6 bg-surface-2 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="discover-overline-muted">Discovery Profile</span>
        <div className="flex items-center gap-1.5 rounded-full bg-brand-green/10 px-2.5 py-1 text-brand-green">
          <Flame className="size-3.5" strokeWidth={2} />
          <span className="text-xs font-bold tabular-nums">{profile.discoveryStreak}d streak</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5 rounded-md bg-surface-1/50 px-3 py-2.5">
          <span className="discover-overline text-text-tertiary">Current mood</span>
          <span className="text-sm font-semibold text-text-primary">{profile.currentMood}</span>
        </div>
        <div className="flex flex-col gap-1.5 rounded-md bg-surface-1/50 px-3 py-2.5">
          <span className="discover-overline text-text-tertiary">Exploration</span>
          <motion.span
            key={profile.explorationLevel}
            initial={{ opacity: 0.4, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-semibold tabular-nums text-text-primary"
          >
            {profile.explorationLevel}%
          </motion.span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="discover-overline text-text-tertiary">Comfort vs. exploration</span>
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
        <div className="flex items-center justify-between text-[11px] tabular-nums text-text-tertiary">
          <span>Comfort {profile.comfortVsExploration.comfort}%</span>
          <span>Exploration {profile.comfortVsExploration.exploration}%</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="discover-overline text-text-tertiary">Preferred genres</span>
        <div className="flex flex-col gap-3">
          {profile.preferredGenres.map((entry) => (
            <div key={entry.genre} className="flex items-center gap-3">
              <span className="w-24 shrink-0 truncate text-xs text-text-secondary">{entry.genre}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: ACCENT_COLOR_VAR[entry.accent] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${entry.weight}%` }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <span className="w-8 shrink-0 text-right text-xs font-semibold tabular-nums text-text-primary">
                {entry.weight}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="discover-overline text-text-tertiary">Recently discovered</span>
        <div className="flex flex-col gap-1">
          {profile.recentlyDiscovered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-md bg-surface-1/40 px-4 py-6 text-center">
              <Sparkles className="size-5 text-text-tertiary" strokeWidth={1.5} />
              <p className="text-xs leading-relaxed text-text-tertiary">
                Save a recommendation to start building your discovery history.
              </p>
            </div>
          ) : (
            profile.recentlyDiscovered
              .slice()
              .reverse()
              .slice(0, 5)
              .map((entry, index) => (
                <motion.div
                  key={`${entry.artist}-${entry.discoveredAt}`}
                  initial={{ opacity: 0, x: 4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="flex items-center justify-between gap-2 rounded-md px-2 py-2 transition-colors hover:bg-surface-1/50"
                >
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium text-text-primary">{entry.artist}</span>
                    <span className="truncate text-xs text-text-tertiary">{entry.genre}</span>
                  </div>
                  <span className="shrink-0 text-[11px] text-text-tertiary">{formatDate(entry.discoveredAt)}</span>
                </motion.div>
              ))
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="discover-overline text-text-tertiary">Taste evolution</span>
        <ol className="flex flex-col gap-0">
          {sortedEvolution.slice(0, 6).map((entry, i) => (
            <li key={entry.id} className="relative flex gap-3">
              <div className="relative flex w-3 shrink-0 flex-col items-center">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-green" />
                {i < Math.min(sortedEvolution.length, 6) - 1 ? (
                  <span className="mt-1 w-px flex-1 bg-border/80" />
                ) : null}
              </div>
              <div className="flex flex-col gap-0.5 pb-4">
                <p className="text-xs font-medium text-text-primary">{entry.label}</p>
                <p className="text-[11px] leading-relaxed text-text-tertiary">{entry.detail}</p>
                <p className="text-[11px] text-text-tertiary/80">{formatDate(entry.date)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
