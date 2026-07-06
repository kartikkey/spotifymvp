"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import {
  ACTIVITY_CHIPS,
  MOOD_CHIPS,
  type ActivityChip,
  type GenerateJourneyParams,
  type MoodChip,
  type RecentlyPlayedTrack,
  type SuggestedPrompt,
} from "@/lib/types";
import { FilterChip } from "@/components/shared/filter-chip";
import { Slider } from "@/components/ui/slider";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";

interface DiscoveryCompanionProps {
  suggestedPrompts: SuggestedPrompt[];
  recentlyPlayed: RecentlyPlayedTrack[];
  initialExplorationLevel: number;
  initialMood: MoodChip;
  isGenerating: boolean;
  onGenerate: (params: GenerateJourneyParams) => void;
}

function explorationCopy(level: number): string {
  if (level >= 70) return "Adventurous — mostly new ground";
  if (level >= 40) return "Balanced — familiar and new";
  return "Comfort zone — close to what you know";
}

export function DiscoveryCompanion({
  suggestedPrompts,
  recentlyPlayed,
  initialExplorationLevel,
  initialMood,
  isGenerating,
  onGenerate,
}: DiscoveryCompanionProps) {
  const [prompt, setPrompt] = useState("");
  const [mood, setMood] = useState<MoodChip | undefined>(initialMood);
  const [activity, setActivity] = useState<ActivityChip | undefined>(undefined);
  const [explorationLevel, setExplorationLevel] = useState(initialExplorationLevel);

  function handleSubmit() {
    if (isGenerating) return;
    onGenerate({
      prompt: prompt.trim() || undefined,
      mood,
      activity,
      explorationLevel,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-green">
          <Sparkles className="size-3.5" />
          AI Discovery Companion
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-[28px]">
          What do you want to hear today?
        </h1>
        <p className="max-w-2xl text-sm text-text-secondary">
          Tell me a vibe, pick a mood, or just hit generate — I&apos;ll build a discovery journey from your
          current taste out to something you&apos;ve never heard.
        </p>
      </div>

      <InputGroup className="h-auto items-end bg-surface-1 px-1 py-1">
        <InputGroupTextarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Ask for a vibe, an artist, an era — anything."
          rows={1}
          className="min-h-10 px-3 py-2"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            size="icon-sm"
            variant="default"
            aria-label="Generate discovery journey"
            disabled={isGenerating}
            onClick={handleSubmit}
            className="rounded-md bg-brand-green text-black hover:bg-brand-green-bright disabled:opacity-60"
          >
            {isGenerating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowUp className="size-4" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex flex-wrap items-center gap-1.5">
        {suggestedPrompts.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setPrompt(entry.prompt)}
            className="inline-flex h-7 shrink-0 items-center rounded-full bg-surface-2 px-3 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-3 hover:text-text-primary"
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            How are you feeling?
          </span>
          <div className="flex flex-wrap gap-1.5">
            {MOOD_CHIPS.map((chip) => (
              <FilterChip
                key={chip}
                label={chip}
                active={mood === chip}
                onClick={() => setMood((prev) => (prev === chip ? undefined : chip))}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            What are you doing?
          </span>
          <div className="flex flex-wrap gap-1.5">
            {ACTIVITY_CHIPS.map((chip) => (
              <FilterChip
                key={chip}
                label={chip}
                active={activity === chip}
                onClick={() => setActivity((prev) => (prev === chip ? undefined : chip))}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-lg bg-surface-1 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Exploration level
          </span>
          <span className="text-xs font-medium text-text-primary">{explorationCopy(explorationLevel)}</span>
        </div>
        <Slider
          value={explorationLevel}
          onValueChange={(value) => setExplorationLevel(value as number)}
          min={0}
          max={100}
          step={5}
        />
        <div className="flex items-center justify-between text-[11px] text-text-tertiary">
          <span>Comfort zone</span>
          <span>Adventurous</span>
        </div>
      </div>

      {recentlyPlayed.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Because you&apos;ve been playing
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {recentlyPlayed.slice(0, 4).map((track) => (
              <div key={track.id} className="flex flex-col">
                <span className="text-sm font-medium text-text-primary">{track.title}</span>
                <span className="text-xs text-text-tertiary">
                  {track.artist} · {formatRelativeTime(track.playedAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isGenerating}
        className={cn(
          "flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand-green text-sm font-bold text-black transition-colors hover:bg-brand-green-bright disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit sm:px-8"
        )}
      >
        {isGenerating ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Curating your journey...
          </>
        ) : (
          <>
            <Sparkles className="size-4" />
            Generate my discovery journey
          </>
        )}
      </button>
    </motion.div>
  );
}
