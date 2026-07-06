"use client";

import { motion } from "framer-motion";
import { ChevronRight, Moon } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { RECOMMENDATION_STAGES, type DiscoveryProfile } from "@/lib/types";
import { TrackArtwork } from "./track-artwork";

interface DiscoveryProfilePanelProps {
  profile: DiscoveryProfile;
  className?: string;
}

export function DiscoveryProfilePanel({ profile, className }: DiscoveryProfilePanelProps) {
  const sortedEvolution = [...profile.tasteEvolution]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <aside
      id="profile"
      className={cn(
        "flex flex-col gap-5 rounded-md bg-surface-1 p-5 scroll-mt-8 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="discover-overline-muted">Your discovery profile</span>
        <button
          type="button"
          className="flex items-center gap-0.5 text-[11px] font-semibold text-brand-green hover:text-brand-green-bright"
        >
          View full profile
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-text-tertiary">Current mood</span>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-surface-3 px-3 py-1.5 text-xs font-semibold text-text-primary">
          <Moon className="size-3.5 text-text-secondary" />
          {profile.currentMood}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-text-tertiary">Exploration level</span>
          <span className="text-xs font-bold tabular-nums text-brand-green">{profile.explorationLevel}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
          <motion.div
            className="h-full bg-brand-green"
            animate={{ width: `${profile.explorationLevel}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-text-tertiary">
          <span>Comfort</span>
          <span>Adventure</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-medium text-text-tertiary">Comfort vs exploration</span>
        <div className="flex items-center gap-4">
          <div
            className="relative size-16 shrink-0 rounded-full"
            style={{
              background: `conic-gradient(#1db954 0 ${profile.comfortVsExploration.exploration * 3.6}deg, #509bf5 ${profile.comfortVsExploration.exploration * 3.6}deg 360deg)`,
            }}
          >
            <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-surface-1 text-[10px] font-bold tabular-nums text-text-primary">
              {profile.comfortVsExploration.comfort}/{profile.comfortVsExploration.exploration}
            </div>
          </div>
          <div className="flex flex-col gap-1 text-[11px] text-text-tertiary">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-accent-blue" />
              Comfort {profile.comfortVsExploration.comfort}%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-brand-green" />
              Exploration {profile.comfortVsExploration.exploration}%
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-text-tertiary">Top genres</span>
        <div className="flex flex-wrap gap-1.5">
          {profile.preferredGenres.slice(0, 5).map((g) => (
            <span
              key={g.genre}
              className="rounded-full bg-surface-3 px-2.5 py-1 text-[11px] font-medium text-text-secondary"
            >
              {g.genre}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-text-tertiary">Recently discovered</span>
        <div className="flex flex-col gap-1">
          {profile.recentlyDiscovered.length === 0 ? (
            <p className="text-xs text-text-tertiary">Keep tracks you love to see them here.</p>
          ) : (
            profile.recentlyDiscovered
              .slice()
              .reverse()
              .slice(0, 3)
              .map((entry, i) => (
                <div key={`${entry.artist}-${entry.discoveredAt}`} className="flex items-center gap-3 py-1.5">
                  <TrackArtwork
                    stage={RECOMMENDATION_STAGES[i % RECOMMENDATION_STAGES.length]}
                    artist={entry.artist}
                    className="size-10"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium text-text-primary">{entry.artist}</span>
                    <span className="truncate text-xs text-text-tertiary">{entry.genre}</span>
                  </div>
                  <span className="shrink-0 text-[10px] text-text-tertiary">{formatDate(entry.discoveredAt)}</span>
                </div>
              ))
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-text-tertiary">Taste evolution</span>
        <div className="flex h-12 items-end gap-0.5">
          {profile.tasteEvolution.slice(0, 12).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-brand-green/60"
              initial={{ height: 0 }}
              animate={{ height: `${30 + ((i * 17) % 70)}%` }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            />
          ))}
        </div>
        <ul className="flex flex-col gap-1.5 pt-1">
          {sortedEvolution.map((entry) => (
            <li key={entry.id} className="text-[11px] text-text-tertiary">
              <span className="text-text-secondary">{entry.label}</span>
              <span className="text-text-tertiary/70"> · {formatDate(entry.date)}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
