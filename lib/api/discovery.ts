import {
  DISCOVERY_TRACKS,
  INITIAL_DISCOVERY_PROFILE,
  RECENTLY_PLAYED,
  SUGGESTED_PROMPTS,
  matchesActivity,
  matchesMood,
} from "@/lib/data/discovery";
import {
  RECOMMENDATION_STAGES,
  type DiscoveryJourney,
  type DiscoveryProfile,
  type DiscoveryTrack,
  type GenerateJourneyParams,
  type RecentlyPlayedTrack,
  type SuggestedPrompt,
} from "@/lib/types";

/**
 * Thin async service layer over the mock fixtures, same shape as lib/api's
 * other modules. generateDiscoveryJourney carries an artificial delay to
 * stand in for an AI recommendation call and give the UI something real to
 * show a loading state for.
 */
export async function getDiscoveryProfile(): Promise<DiscoveryProfile> {
  return INITIAL_DISCOVERY_PROFILE;
}

export async function getRecentlyPlayed(): Promise<RecentlyPlayedTrack[]> {
  return RECENTLY_PLAYED;
}

export async function getSuggestedPrompts(): Promise<SuggestedPrompt[]> {
  return SUGGESTED_PROMPTS;
}

function scoreTrack(track: DiscoveryTrack, params: GenerateJourneyParams): number {
  let score = 0;
  if (matchesMood(track, params.mood)) score += 3;
  if (matchesActivity(track, params.activity)) score += 3;

  const explorationDistance = Math.abs(track.discoveryScore - params.explorationLevel);
  score += (100 - explorationDistance) / 20;

  if (params.prompt) {
    const q = params.prompt.toLowerCase();
    const haystack = [track.genre, ...track.tags].join(" ").toLowerCase();
    if (haystack.split(" ").some((word) => word.length > 3 && q.includes(word))) {
      score += 2;
    }
  }

  return score;
}

function pickForStage(stage: string, params: GenerateJourneyParams): DiscoveryTrack {
  const candidates = DISCOVERY_TRACKS.filter((t) => t.stage === stage);
  return candidates.reduce((best, candidate) =>
    scoreTrack(candidate, params) > scoreTrack(best, params) ? candidate : best
  );
}

function buildPromptSummary(params: GenerateJourneyParams): string {
  const parts: string[] = [];
  if (params.prompt) parts.push(`"${params.prompt}"`);
  if (params.mood) parts.push(`a ${params.mood.toLowerCase()} mood`);
  if (params.activity) parts.push(params.activity.toLowerCase());

  const base = parts.length > 0 ? `Built from ${parts.join(", ")}` : "Built from your listening history";
  const exploration =
    params.explorationLevel >= 70
      ? "leaning heavily into new territory"
      : params.explorationLevel >= 40
        ? "balancing familiar and new"
        : "staying close to your comfort zone";

  return `${base}, ${exploration}.`;
}

export async function generateDiscoveryJourney(params: GenerateJourneyParams): Promise<DiscoveryJourney> {
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const tracks = RECOMMENDATION_STAGES.map((stage) => pickForStage(stage, params));

  return {
    id: `journey-${Date.now()}`,
    promptSummary: buildPromptSummary(params),
    createdAt: new Date().toISOString(),
    tracks,
  };
}
