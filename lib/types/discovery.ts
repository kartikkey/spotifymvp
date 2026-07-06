import type { AccentToken } from "./common";

export const RECOMMENDATION_STAGES = [
  "current-taste",
  "bridge-artist",
  "emerging-artist",
  "hidden-gem",
  "genre-expansion",
] as const;

export type RecommendationStage = (typeof RECOMMENDATION_STAGES)[number];

export const RECOMMENDATION_STAGE_LABELS: Record<RecommendationStage, string> = {
  "current-taste": "Current Taste",
  "bridge-artist": "Bridge Artist",
  "emerging-artist": "Emerging Artist",
  "hidden-gem": "Hidden Gem",
  "genre-expansion": "Genre Expansion",
};

/** Reference-style uppercase stage tags shown on journey cards */
export const RECOMMENDATION_STAGE_TAGS: Record<RecommendationStage, string> = {
  "current-taste": "Start Here",
  "bridge-artist": "Bridge Artist",
  "emerging-artist": "Emerging Artist",
  "hidden-gem": "Hidden Gem",
  "genre-expansion": "Genre Expansion",
};

export const RECOMMENDATION_STAGE_DESCRIPTIONS: Record<RecommendationStage, string> = {
  "current-taste": "Right in your lane, matching what you already play on repeat.",
  "bridge-artist": "One step outward, connected to your taste by sound or scene.",
  "emerging-artist": "Rising fast and not yet mainstream, early access to what's next.",
  "hidden-gem": "Rarely surfaced, a deep cut most listeners scroll past.",
  "genre-expansion": "A genre you don't listen to yet, chosen for what you'd probably love in it.",
};

/** Two accent tokens blended for the stylized artwork tile — no photography, per design-system.md §8.2. */
export const RECOMMENDATION_STAGE_ARTWORK: Record<RecommendationStage, [AccentToken, AccentToken]> = {
  "current-taste": ["blue", "purple"],
  "bridge-artist": ["purple", "pink"],
  "emerging-artist": ["gold", "orange"],
  "hidden-gem": ["pink", "blue"],
  "genre-expansion": ["orange", "gold"],
};

export const MOOD_CHIPS = [
  "Energetic",
  "Chill",
  "Melancholy",
  "Focused",
  "Romantic",
  "Nostalgic",
  "Confident",
  "Euphoric",
] as const;

export type MoodChip = (typeof MOOD_CHIPS)[number];

export const ACTIVITY_CHIPS = [
  "Working out",
  "Studying",
  "Commuting",
  "Cooking",
  "Late-night drive",
  "Winding down",
  "Party prep",
  "Deep work",
] as const;

export type ActivityChip = (typeof ACTIVITY_CHIPS)[number];

export interface DiscoveryTrack {
  id: string;
  stage: RecommendationStage;
  trackTitle: string;
  artist: string;
  artworkUrl: string;
  genre: string;
  year: number;
  tags: string[];
  durationSec: number;
  energy: number;
  familiarityScore: number;
  discoveryScore: number;
  explanation: string;
  moods: MoodChip[];
  activities: ActivityChip[];
}

export const FEEDBACK_TYPES = [
  "love-this",
  "more-like-this",
  "too-familiar",
  "too-different",
  "wrong-mood",
  "less-mainstream",
  "better-vocals",
  "better-for-work",
  "better-for-gym",
] as const;

export type FeedbackType = (typeof FEEDBACK_TYPES)[number];

export const FEEDBACK_LABELS: Record<FeedbackType, string> = {
  "love-this": "Love this",
  "more-like-this": "More like this",
  "too-familiar": "Too familiar",
  "too-different": "Too different",
  "wrong-mood": "Wrong mood",
  "less-mainstream": "Less mainstream",
  "better-vocals": "Better vocals",
  "better-for-work": "Better for work",
  "better-for-gym": "Better for gym",
};

/** How each feedback type nudges the profile's exploration/comfort balance. Positive = more exploration. */
export const FEEDBACK_EXPLORATION_DELTA: Record<FeedbackType, number> = {
  "love-this": 2,
  "more-like-this": -3,
  "too-familiar": 6,
  "too-different": -8,
  "wrong-mood": 0,
  "less-mainstream": 9,
  "better-vocals": 0,
  "better-for-work": 0,
  "better-for-gym": 0,
};

export const FEEDBACK_ADAPTATION_COPY: Record<FeedbackType, string> = {
  "love-this": "Noted — more from artists like this coming up.",
  "more-like-this": "Got it. Leaning into this exact sound for future picks.",
  "too-familiar": "Understood — pushing your exploration level up a notch.",
  "too-different": "Dialing it back closer to your core taste next time.",
  "wrong-mood": "Thanks — re-reading the room for your next journey.",
  "less-mainstream": "Going deeper. Prioritizing lower-exposure artists from here.",
  "better-vocals": "Weighting vocal performance higher in future picks.",
  "better-for-work": "Saving this context — tuning future work-mode picks.",
  "better-for-gym": "Saving this context — tuning future gym-mode picks.",
};

export interface TrackFeedback {
  trackId: string;
  type: FeedbackType;
  givenAt: string;
}

export interface DiscoveryJourney {
  id: string;
  promptSummary: string;
  createdAt: string;
  tracks: DiscoveryTrack[];
}

export interface GenerateJourneyParams {
  prompt?: string;
  mood?: MoodChip;
  activity?: ActivityChip;
  explorationLevel: number;
}

export interface SuggestedPrompt {
  id: string;
  label: string;
  prompt: string;
}

export interface RecentlyPlayedTrack {
  id: string;
  title: string;
  artist: string;
  artworkUrl: string;
  playedAt: string;
}

export interface TasteEvolutionEntry {
  id: string;
  date: string;
  label: string;
  detail: string;
}

export interface PreferredGenre {
  genre: string;
  weight: number;
  accent: AccentToken;
}

export interface DiscoveredArtist {
  artist: string;
  genre: string;
  artworkUrl: string;
  discoveredAt: string;
}

export interface DiscoveryProfile {
  preferredGenres: PreferredGenre[];
  currentMood: MoodChip;
  explorationLevel: number;
  recentlyDiscovered: DiscoveredArtist[];
  discoveryStreak: number;
  comfortVsExploration: { comfort: number; exploration: number };
  tasteEvolution: TasteEvolutionEntry[];
}
