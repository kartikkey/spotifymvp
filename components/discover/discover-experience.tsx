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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useDiscoverUI } from "./discover-ui-context";
import { DiscoveryCompanion } from "./discovery-companion";
import { RecommendationJourney } from "./recommendation-journey";
import { DiscoveryJourneySkeleton } from "./discovery-journey-skeleton";
import { DiscoveryProfilePanel } from "./discovery-profile-panel";
import { JourneyPlaceholder } from "./journey-placeholder";

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
}: DiscoverExperienceProps) {
  const { profileOpen, closeProfile, setNowPlaying } = useDiscoverUI();
  const [profile, setProfile] = useState<DiscoveryProfile>(initialProfile);
  const [journey, setJourney] = useState<DiscoveryJourney | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [savedTrackIds, setSavedTrackIds] = useState<Set<string>>(new Set());
  const [resolvedTrackIds, setResolvedTrackIds] = useState<Set<string>>(new Set());
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
    setResolvedTrackIds(new Set());
    setSavedTrackIds(new Set());
    setNowPlaying(null, false);
    try {
      const result = await generateDiscoveryJourney(params);
      setJourney(result);
      setProfile((prev) => ({
        ...prev,
        explorationLevel: params.explorationLevel,
        currentMood: params.mood ?? prev.currentMood,
      }));
    } finally {
      setIsGenerating(false);
    }
  }

  function handleTogglePreview(trackId: string) {
    const track = journey?.tracks.find((t) => t.id === trackId);
    if (!track) return;

    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
      previewTimeout.current = null;
    }

    setPlayingTrackId((current) => {
      if (current === trackId) {
        setNowPlaying(null, false);
        return null;
      }
      setNowPlaying(track, true);
      previewTimeout.current = setTimeout(() => {
        setPlayingTrackId(null);
        setNowPlaying(null, false);
      }, 8000);
      return trackId;
    });
  }

  function handleSave(trackId: string) {
    const track = journey?.tracks.find((t) => t.id === trackId);
    if (!track || savedTrackIds.has(trackId)) return;

    setSavedTrackIds((prev) => new Set(prev).add(trackId));
    setProfile((prevProfile) => {
      const alreadyDiscovered = prevProfile.recentlyDiscovered.some((d) => d.artist === track.artist);
      const draft: DiscoveryProfile = {
        ...prevProfile,
        recentlyDiscovered: alreadyDiscovered
          ? prevProfile.recentlyDiscovered
          : [
              ...prevProfile.recentlyDiscovered,
              { artist: track.artist, genre: track.genre, artworkUrl: track.artworkUrl, discoveredAt: new Date().toISOString() },
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
      description: "Added to your Discovery Profile.",
    });
  }

  function applyFeedback(trackId: string, type: FeedbackType) {
    const track = journey?.tracks.find((t) => t.id === trackId);
    if (!track) return;

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
      description: `Applied to future recommendations like "${track.trackTitle}".`,
    });
  }

  function handleKeep(trackId: string) {
    handleSave(trackId);
    applyFeedback(trackId, "love-this");
    setResolvedTrackIds((prev) => new Set(prev).add(trackId));
    if (playingTrackId === trackId) {
      setPlayingTrackId(null);
      setNowPlaying(null, false);
    }
  }

  function handleSkip(trackId: string) {
    applyFeedback(trackId, "too-familiar");
    setResolvedTrackIds((prev) => new Set(prev).add(trackId));
    if (playingTrackId === trackId) {
      setPlayingTrackId(null);
      setNowPlaying(null, false);
    }
  }

  function handleReset() {
    setJourney(null);
    setResolvedTrackIds(new Set());
    setSavedTrackIds(new Set());
    setPlayingTrackId(null);
    setNowPlaying(null, false);
  }

  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <DiscoveryCompanion
            suggestedPrompts={suggestedPrompts}
            initialExplorationLevel={profile.explorationLevel}
            initialMood={profile.currentMood}
            isGenerating={isGenerating}
            journeyActive={!!journey}
            onGenerate={handleGenerate}
          />

          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <DiscoveryJourneySkeleton />
              </motion.div>
            ) : journey ? (
              <motion.div
                key="journey"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <RecommendationJourney
                  journey={journey}
                  playingTrackId={playingTrackId}
                  resolvedTrackIds={resolvedTrackIds}
                  savedTrackIds={savedTrackIds}
                  onTogglePreview={handleTogglePreview}
                  onKeep={handleKeep}
                  onSkip={handleSkip}
                  onReset={handleReset}
                />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <JourneyPlaceholder />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DiscoveryProfilePanel
          profile={profile}
          className="hidden w-full shrink-0 lg:sticky lg:top-6 lg:flex lg:w-[300px]"
        />
      </div>

      <Sheet open={profileOpen} onOpenChange={(open) => !open && closeProfile()}>
        <SheetContent side="right" className="w-full max-w-sm overflow-y-auto bg-surface-1 p-0">
          <SheetHeader className="border-b border-border px-5 py-4">
            <SheetTitle className="text-base font-bold text-text-primary">Your Profile</SheetTitle>
          </SheetHeader>
          <DiscoveryProfilePanel profile={profile} className="rounded-none bg-transparent" />
        </SheetContent>
      </Sheet>
    </>
  );
}
