"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Loader2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GenerateJourneyParams, MoodChip, SuggestedPrompt } from "@/lib/types";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { RefineJourneyPanel } from "./refine-journey-panel";

interface DiscoveryCompanionProps {
  suggestedPrompts: SuggestedPrompt[];
  initialExplorationLevel: number;
  initialMood: MoodChip;
  isGenerating: boolean;
  journeyActive: boolean;
  journeySummary?: string;
  onGenerate: (params: GenerateJourneyParams) => void;
  onNewJourney: () => void;
}

export function DiscoveryCompanion({
  suggestedPrompts,
  initialExplorationLevel,
  initialMood,
  isGenerating,
  journeyActive,
  journeySummary,
  onGenerate,
  onNewJourney,
}: DiscoveryCompanionProps) {
  const [prompt, setPrompt] = useState("");
  const [mood, setMood] = useState<MoodChip | undefined>(initialMood);
  const [activity, setActivity] = useState<GenerateJourneyParams["activity"]>(undefined);
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

  if (journeyActive && journeySummary) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        className="flex items-center justify-between gap-4 rounded-md bg-surface-1 px-4 py-3"
      >
        <p className="min-w-0 truncate text-sm text-text-secondary">{journeySummary}</p>
        <button
          type="button"
          onClick={onNewJourney}
          className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-text-secondary transition-colors hover:text-text-primary"
        >
          <RotateCcw className="size-3.5" />
          New journey
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-6"
    >
      <h1 className="text-[32px] font-bold leading-tight tracking-tight text-text-primary">
        What do you want to hear today?
      </h1>

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

      <RefineJourneyPanel
        mood={mood}
        activity={activity}
        explorationLevel={explorationLevel}
        onMoodChange={setMood}
        onActivityChange={setActivity}
        onExplorationChange={setExplorationLevel}
      />

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
          "Generate Journey"
        )}
      </button>
    </motion.div>
  );
}
