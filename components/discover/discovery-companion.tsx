"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Loader2 } from "lucide-react";
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
  onGenerate: (params: GenerateJourneyParams) => void;
}

export function DiscoveryCompanion({
  suggestedPrompts,
  initialExplorationLevel,
  initialMood,
  isGenerating,
  journeyActive,
  onGenerate,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <span className="discover-overline-accent">AI Discovery Companion</span>
        <h1 className="text-[32px] font-bold leading-tight tracking-tight text-text-primary sm:text-[36px]">
          What do you want to hear today?
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
          Tell me a vibe, pick a mood, or just hit generate — I&apos;ll build a discovery journey from
          your current taste out to something you&apos;ve never heard.
        </p>
      </div>

      <InputGroup className="h-auto items-end rounded-full border-border/80 bg-surface-1 px-1.5 py-1.5 transition-colors focus-within:border-brand-green/50 focus-within:ring-2 focus-within:ring-brand-green/20">
        <InputGroupTextarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Describe a vibe, artist, era, or anything..."
          rows={1}
          className="min-h-11 px-4 py-2.5 text-sm leading-relaxed"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            size="icon-sm"
            variant="default"
            aria-label="Generate discovery journey"
            disabled={isGenerating}
            onClick={handleSubmit}
            className="size-9 rounded-full bg-brand-green text-black hover:bg-brand-green-bright disabled:opacity-60"
          >
            {isGenerating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowUp className="size-4" strokeWidth={2.5} />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <div className="flex flex-wrap items-center gap-2">
        {suggestedPrompts.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => setPrompt(entry.prompt)}
            className={cn(
              "discover-chip-rest h-8 px-3.5",
              prompt === entry.prompt && "ring-1 ring-brand-green/40 text-text-primary"
            )}
          >
            {entry.label}
          </button>
        ))}
      </div>

      {!journeyActive ? (
        <>
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
              "flex h-11 w-full items-center justify-center rounded-full bg-brand-green text-sm font-bold text-black transition-all hover:bg-brand-green-bright disabled:opacity-60 sm:w-fit sm:px-10"
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
        </>
      ) : null}
    </motion.div>
  );
}
