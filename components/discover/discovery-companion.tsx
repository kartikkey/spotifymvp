"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { RecentlyPlayedRow } from "./recently-played-row";

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
      className="discover-section-gap"
    >
      <div className="flex flex-col gap-2.5">
        <span className="discover-overline-accent flex items-center gap-1.5">
          <Sparkles className="size-3.5" strokeWidth={2} />
          AI Discovery Companion
        </span>
        <h1 className="text-[28px] font-bold leading-tight tracking-tight text-text-primary sm:text-[32px]">
          What do you want to hear today?
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
          Tell me a vibe, pick a mood, or just hit generate — I&apos;ll build a discovery journey from your
          current taste out to something you&apos;ve never heard.
        </p>
      </div>

      <InputGroup className="h-auto items-end border-border/80 bg-surface-1 px-1 py-1 transition-colors focus-within:border-brand-green/50 focus-within:ring-2 focus-within:ring-brand-green/20">
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
          className="min-h-11 px-3 py-2.5 text-sm leading-relaxed"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            size="icon-sm"
            variant="default"
            aria-label="Generate discovery journey"
            disabled={isGenerating}
            onClick={handleSubmit}
            className="rounded-full bg-brand-green text-black transition-colors hover:bg-brand-green-bright disabled:opacity-60"
          >
            {isGenerating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowUp className="size-4" strokeWidth={2.5} />
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
            className={cn(
              "discover-chip-rest",
              prompt === entry.prompt && "bg-surface-3 text-text-primary ring-1 ring-brand-green/30"
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <span className="discover-overline-muted">How are you feeling?</span>
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

        <div className="flex flex-col gap-3">
          <span className="discover-overline-muted">What are you doing?</span>
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

      <div className="discover-card bg-surface-1">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="discover-overline-muted">Exploration level</span>
          <motion.span
            key={explorationCopy(explorationLevel)}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-xs font-medium text-text-primary"
          >
            {explorationCopy(explorationLevel)}
          </motion.span>
        </div>
        <Slider
          value={explorationLevel}
          onValueChange={(value) => setExplorationLevel(value as number)}
          min={0}
          max={100}
          step={5}
        />
        <div className="mt-2 flex items-center justify-between text-[11px] text-text-tertiary">
          <span>Comfort zone</span>
          <span>Adventurous</span>
        </div>
      </div>

      <RecentlyPlayedRow tracks={recentlyPlayed} />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isGenerating}
        className={cn(
          "flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-green text-sm font-bold text-black transition-all duration-150 hover:scale-[1.01] hover:bg-brand-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-fit sm:px-10"
        )}
      >
        {isGenerating ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Curating your journey...
          </>
        ) : (
          <>
            <Sparkles className="size-4" strokeWidth={2} />
            Generate my discovery journey
          </>
        )}
      </button>
    </motion.div>
  );
}
