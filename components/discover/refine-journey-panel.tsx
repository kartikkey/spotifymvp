"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ACTIVITY_CHIPS,
  MOOD_CHIPS,
  type ActivityChip,
  type MoodChip,
} from "@/lib/types";
import { FilterChip } from "@/components/shared/filter-chip";
import { Slider } from "@/components/ui/slider";

interface RefineJourneyPanelProps {
  mood: MoodChip | undefined;
  activity: ActivityChip | undefined;
  explorationLevel: number;
  onMoodChange: (mood: MoodChip | undefined) => void;
  onActivityChange: (activity: ActivityChip | undefined) => void;
  onExplorationChange: (level: number) => void;
}

function explorationCopy(level: number): string {
  if (level >= 70) return "Adventurous — mostly new ground";
  if (level >= 40) return "Balanced — familiar and new";
  return "Comfort zone — close to what you know";
}

export function RefineJourneyPanel({
  mood,
  activity,
  explorationLevel,
  onMoodChange,
  onActivityChange,
  onExplorationChange,
}: RefineJourneyPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-fit items-center gap-1.5 rounded-md py-1 text-xs font-semibold text-text-secondary transition-colors hover:text-text-primary"
      >
        <ChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
        Refine Journey
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-5 pt-4">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2.5">
                  <span className="discover-overline-muted">How are you feeling?</span>
                  <div className="flex flex-wrap gap-1.5">
                    {MOOD_CHIPS.map((chip) => (
                      <FilterChip
                        key={chip}
                        label={chip}
                        active={mood === chip}
                        onClick={() => onMoodChange(mood === chip ? undefined : chip)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="discover-overline-muted">What are you doing?</span>
                  <div className="flex flex-wrap gap-1.5">
                    {ACTIVITY_CHIPS.map((chip) => (
                      <FilterChip
                        key={chip}
                        label={chip}
                        active={activity === chip}
                        onClick={() => onActivityChange(activity === chip ? undefined : chip)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-md bg-surface-1 px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="discover-overline-muted">Exploration level</span>
                  <span className="text-xs font-medium text-text-primary">
                    {explorationCopy(explorationLevel)}
                  </span>
                </div>
                <Slider
                  value={explorationLevel}
                  onValueChange={(value) => onExplorationChange(value as number)}
                  min={0}
                  max={100}
                  step={5}
                />
                <div className="flex items-center justify-between text-[11px] text-text-tertiary">
                  <span>Comfort zone</span>
                  <span>Adventurous</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
