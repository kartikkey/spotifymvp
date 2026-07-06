"use client";

import { Compass } from "lucide-react";
import { RECOMMENDATION_STAGE_LABELS, RECOMMENDATION_STAGES } from "@/lib/types";

export function JourneyPlaceholder() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4 rounded-md bg-surface-1 px-6 py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-surface-3">
          <Compass className="size-6 text-text-tertiary" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-text-primary">Your journey starts here</p>
          <p className="text-xs text-text-tertiary">
            Five steps from what you know to what you&apos;ll love next.
          </p>
        </div>
      </div>

      <div className="hidden flex-col gap-0 sm:flex">
        {RECOMMENDATION_STAGES.map((stage, index) => (
          <div key={stage} className="flex items-center gap-3 py-2">
            <span className="w-5 text-center text-[11px] font-bold text-text-tertiary">{index + 1}</span>
            <span className="text-xs text-text-tertiary">{RECOMMENDATION_STAGE_LABELS[stage]}</span>
            {index < RECOMMENDATION_STAGES.length - 1 ? (
              <span className="ml-auto text-text-tertiary/50">↓</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
