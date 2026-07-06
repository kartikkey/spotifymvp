"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { ACCENT_COLOR_VAR } from "@/lib/theme";
import type { DiscoveryProfile } from "@/lib/types";

interface DiscoveryProfilePanelProps {
  profile: DiscoveryProfile;
  className?: string;
}

/**
 * Persistent read of the listener's evolving taste (design-system.md §8.1/§8.2
 * conventions — quiet stats, no borders, surface-1 background). Every value
 * here is derived from live feedback state in the parent, so this panel
 * updates the moment a listener teaches the AI something new.
 */
export function DiscoveryProfilePanel({ profile, className }: DiscoveryProfilePanelProps) {
  const sortedEvolution = [...profile.tasteEvolution].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={cn("flex flex-col gap-6 rounded-lg bg-surface-1 p-5", className)}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Discovery Profile
        </span>
        <div className="flex items-center gap-1 text-brand-green">
          <Flame className="size-3.5" />
          <span className="text-xs font-bold tabular-nums">{profile.discoveryStreak}d streak</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
            Current mood
          </span>
          <span className="text-sm font-semibold text-text-primary">{profile.currentMood}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
            Exploration level
          </span>
          <motion.span
            key={profile.explorationLevel}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="text-sm font-semibold tabular-nums text-text-primary"
          >
            {profile.explorationLevel}%
          </motion.span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
          Comfort vs. exploration
        </span>
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-surface-3">
          <motion.div
            className="h-full bg-accent-blue"
            animate={{ width: `${profile.comfortVsExploration.comfort}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="h-full bg-brand-green"
            animate={{ width: `${profile.comfortVsExploration.exploration}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-text-tertiary">
          <span>Comfort {profile.comfortVsExploration.comfort}%</span>
          <span>Exploration {profile.comfortVsExploration.exploration}%</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
          Preferred genres
        </span>
        <div className="flex flex-col gap-2.5">
          {profile.preferredGenres.map((entry) => (
            <div key={entry.genre} className="flex items-center gap-3">
              <span className="w-24 shrink-0 truncate text-xs text-text-secondary">{entry.genre}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: ACCENT_COLOR_VAR[entry.accent] }}
                  animate={{ width: `${entry.weight}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
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
        <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
          Recently discovered
        </span>
        <div className="flex flex-col gap-2">
          {profile.recentlyDiscovered.length === 0 ? (
            <p className="text-xs text-text-tertiary">Nothing new saved yet — try saving a recommendation.</p>
          ) : (
            profile.recentlyDiscovered
              .slice()
              .reverse()
              .slice(0, 5)
              .map((entry) => (
                <div key={`${entry.artist}-${entry.discoveredAt}`} className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium text-text-primary">{entry.artist}</span>
                    <span className="truncate text-xs text-text-tertiary">{entry.genre}</span>
                  </div>
                  <span className="shrink-0 text-[11px] text-text-tertiary">{formatDate(entry.discoveredAt)}</span>
                </div>
              ))
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
          Taste evolution
        </span>
        <ol className="flex flex-col gap-3">
          {sortedEvolution.slice(0, 6).map((entry, i) => (
            <li key={entry.id} className="relative flex gap-3">
              <div className="relative flex w-3 shrink-0 flex-col items-center">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-green" />
                {i < Math.min(sortedEvolution.length, 6) - 1 ? (
                  <span className="mt-1 w-px flex-1 bg-border" />
                ) : null}
              </div>
              <div className="flex flex-col gap-0.5 pb-1">
                <p className="text-xs font-medium text-text-primary">{entry.label}</p>
                <p className="text-[11px] text-text-tertiary">{entry.detail}</p>
                <p className="text-[11px] text-text-tertiary">{formatDate(entry.date)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
