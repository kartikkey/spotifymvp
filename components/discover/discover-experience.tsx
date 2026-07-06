"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { generateDiscoveryJourney } from "@/lib/api";
import {
  FEEDBACK_ADAPTATION_COPY,
  FEEDBACK_EXPLORATION_DELTA,
  type DiscoveryJourney,
  type DiscoveryProfile,
  type FeedbackType,
  type GenerateJourneyParams,
  type RecentlyPlayedTrack,
  type SuggestedPrompt,
} from "@/lib/types";
import { DiscoveryCompanion } from "./discovery-companion";
import { RecommendationJourney } from "./recommendation-journey";
import { DiscoveryJourneySkeleton } from "./discovery-journey-skeleton";
import { DiscoveryProfilePanel } from "./discovery-profile-panel";

interface DiscoverExperienceProps {
  initialProfile: DiscoveryProfile;
  suggestedPrompts: SuggestedPrompt[];
  recentlyPlayed: RecentlyPlayedTrack[];
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, value));
}

let evolutionCounter = 0;

export function DiscoverExperience({
  initialProfile,
  suggestedPrompts,
  recentlyPlayed,
}: DiscoverExperienceProps) {
  const [profile, setProfile] = useState<DiscoveryProfile>(initialProfile);
  const [journey, setJourney] = useState<DiscoveryJourney | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [savedTrackIds, setSavedTrackIds] = useState<Set<string>>(new Set());
  const [feedbackByTrack, setFeedbackByTrack] = useState<Record<string, FeedbackType[]>>({});
  const previewTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasBumpedStreak = useRef(false);

  function pushEvolution(profileDraft: DiscoveryProfile, label: string, detail: string) {
    evolutionCounter += 1;
    profileDraft.tasteEvolution = [
      {
        id: `te-live-${evolutionCounter}`,
        date: new Date().toISOString(),
        label,
        detail,
      },
      ...profileDraft.tasteEvolution,
    ];
  }

  async function handleGenerate(params: GenerateJourneyParams) {
    setIsGenerating(true);
    setJourney(null);
    try {
      const result = await generateDiscoveryJourney(params);
      setJourney(result);
      setProfile((prev) => {
        const next: DiscoveryProfile = {
          ...prev,
          explorationLevel: params.explorationLevel,
          currentMood: params.mood ?? prev.currentMood,
        };
        return next;
      });
    } finally {
      setIsGenerating(false);
    }
  }

  function handleTogglePreview(trackId: string) {
    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
      previewTimeout.current = null;
    }
    setPlayingTrackId((current) => {
      if (current === trackId) return null;
      previewTimeout.current = setTimeout(() => setPlayingTrackId(null), 8000);
      return trackId;
    });
  }

  function handleToggleSave(trackId: string) {
    const track = journey?.tracks.find((t) => t.id === trackId);
    if (!track) return;

    setSavedTrackIds((prev) => {
      const next = new Set(prev);
      const isSaving = !next.has(trackId);
      if (isSaving) {
        next.add(trackId);
      } else {
        next.delete(trackId);
      }

      if (isSaving) {
        setProfile((prevProfile) => {
          const alreadyDiscovered = prevProfile.recentlyDiscovered.some(
            (d) => d.artist === track.artist
          );
          const draft: DiscoveryProfile = {
            ...prevProfile,
            recentlyDiscovered: alreadyDiscovered
              ? prevProfile.recentlyDiscovered
              : [
                  ...prevProfile.recentlyDiscovered,
                  { artist: track.artist, genre: track.genre, discoveredAt: new Date().toISOString() },
                ],
            discoveryStreak: hasBumpedStreak.current
              ? prevProfile.discoveryStreak
              : prevProfile.discoveryStreak + 1,
          };
          hasBumpedStreak.current = true;
          if (!alreadyDiscovered) {
            pushEvolution(draft, `Discovered ${track.artist}`, `Saved from a ${track.stage.replace("-", " ")} recommendation.`);
          }
          return draft;
        });
        toast.success(`Saved ${track.artist}`, {
          description: `Added to your Discovery Profile${track.stage !== "current-taste" ? " — new artist" : ""}.`,
        });
      }

      return next;
    });
  }

  function handleFeedback(trackId: string, type: FeedbackType) {
    const track = journey?.tracks.find((t) => t.id === trackId);
    if (!track) return;

    const alreadyGiven = feedbackByTrack[trackId]?.includes(type) ?? false;

    setFeedbackByTrack((prev) => {
      const existing = prev[trackId] ?? [];
      return {
        ...prev,
        [trackId]: alreadyGiven ? existing.filter((t) => t !== type) : [...existing, type],
      };
    });

    if (alreadyGiven) return;

    setProfile((prev) => {
      const delta = FEEDBACK_EXPLORATION_DELTA[type];
      const nextExploration = clamp(prev.comfortVsExploration.exploration + delta);
      const draft: DiscoveryProfile = {
        ...prev,
        comfortVsExploration: {
          exploration: nextExploration,
          comfort: 100 - nextExploration,
        },
        preferredGenres: prev.preferredGenres.map((g) => {
          if (g.genre !== track.genre) return g;
          const genreDelta = type === "love-this" || type === "more-like-this" ? 4 : type === "too-familiar" ? -3 : 0;
          return { ...g, weight: clamp(g.weight + genreDelta) };
        }),
      };
      pushEvolution(draft, `"${type.replace(/-/g, " ")}" on ${track.artist}`, FEEDBACK_ADAPTATION_COPY[type]);
      return draft;
    });

    toast(FEEDBACK_ADAPTATION_COPY[type], {
      description: `Applied to future recommendations like "${track.trackTitle}" by ${track.artist}.`,
    });
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
      <div className="flex min-w-0 flex-1 flex-col gap-10">
        <DiscoveryCompanion
          suggestedPrompts={suggestedPrompts}
          recentlyPlayed={recentlyPlayed}
          initialExplorationLevel={profile.explorationLevel}
          initialMood={profile.currentMood}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
        />

        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div key="loading" exit={{ opacity: 0 }}>
              <DiscoveryJourneySkeleton />
            </motion.div>
          ) : journey ? (
            <motion.div key="journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <RecommendationJourney
                journey={journey}
                playingTrackId={playingTrackId}
                onTogglePreview={handleTogglePreview}
                savedTrackIds={savedTrackIds}
                onToggleSave={handleToggleSave}
                feedbackByTrack={feedbackByTrack}
                onFeedback={handleFeedback}
                onReset={() => setJourney(null)}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <DiscoveryProfilePanel profile={profile} className="w-full shrink-0 lg:sticky lg:top-8 lg:w-80" />
    </div>
  );
}
