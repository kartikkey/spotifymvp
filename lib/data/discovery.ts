import type {
  ActivityChip,
  DiscoveryProfile,
  DiscoveryTrack,
  MoodChip,
  RecentlyPlayedTrack,
  SuggestedPrompt,
} from "@/lib/types";

/**
 * Mock catalog backing the /discover experience. A real implementation would
 * call a recommendation model over the user's listening graph — this stands
 * in with a hand-tagged pool so mood/activity/exploration inputs visibly
 * change which track gets picked per journey stage.
 */

export const RECENTLY_PLAYED: RecentlyPlayedTrack[] = [
  { id: "rp-01", title: "Sofia", artist: "Clairo", playedAt: "2026-07-06T08:12:00Z" },
  { id: "rp-02", title: "Bad Habit", artist: "Steve Lacy", playedAt: "2026-07-05T22:40:00Z" },
  { id: "rp-03", title: "Not Strong Enough", artist: "boygenius", playedAt: "2026-07-05T19:05:00Z" },
  { id: "rp-04", title: "Evergreen", artist: "Omar Apollo", playedAt: "2026-07-04T14:30:00Z" },
  { id: "rp-05", title: "Kokoro", artist: "Rina Sawayama", playedAt: "2026-07-03T21:15:00Z" },
];

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: "prompt-01",
    label: "Surprise me",
    prompt: "Surprise me with something outside my comfort zone.",
  },
  {
    id: "prompt-02",
    label: "Before they blow up",
    prompt: "Find me the next artist before they blow up.",
  },
  {
    id: "prompt-03",
    label: "Still me, but new",
    prompt: "I want something that still feels like me, but new.",
  },
  {
    id: "prompt-04",
    label: "Deep cuts only",
    prompt: "Deep cuts only — nothing I've heard before.",
  },
  {
    id: "prompt-05",
    label: "Fresh workout energy",
    prompt: "Match my workout energy but keep it fresh.",
  },
  {
    id: "prompt-06",
    label: "A new genre, gently",
    prompt: "Ease me into a genre I've never really explored.",
  },
];

export const DISCOVERY_TRACKS: DiscoveryTrack[] = [
  // Current Taste
  {
    id: "dt-01",
    stage: "current-taste",
    trackTitle: "Sofia",
    artist: "Clairo",
    genre: "Bedroom Pop",
    year: 2019,
    tags: ["Bedroom Pop", "Dreamy"],
    durationSec: 190,
    energy: 42,
    familiarityScore: 94,
    discoveryScore: 6,
    explanation:
      "You've played Clairo 11 times this month, more than any other artist — this is the anchor for everything else in this journey.",
    moods: ["Chill", "Nostalgic", "Romantic"],
    activities: ["Winding down", "Studying"],
  },
  {
    id: "dt-02",
    stage: "current-taste",
    trackTitle: "Bad Habit",
    artist: "Steve Lacy",
    genre: "Alt R&B",
    year: 2022,
    tags: ["Alt R&B", "Guitar-driven"],
    durationSec: 232,
    energy: 58,
    familiarityScore: 91,
    discoveryScore: 9,
    explanation:
      "Steve Lacy shows up in three of your last five listening sessions — his guitar-forward R&B is squarely in your top genre.",
    moods: ["Confident", "Chill"],
    activities: ["Commuting", "Cooking"],
  },
  {
    id: "dt-03",
    stage: "current-taste",
    trackTitle: "Not Strong Enough",
    artist: "boygenius",
    genre: "Indie Rock",
    year: 2023,
    tags: ["Indie Rock", "Harmony-heavy"],
    durationSec: 249,
    energy: 55,
    familiarityScore: 88,
    discoveryScore: 12,
    explanation:
      "Indie rock with layered vocal harmonies is a consistent thread in your library — boygenius is the clearest example of it.",
    moods: ["Melancholy", "Nostalgic"],
    activities: ["Late-night drive", "Winding down"],
  },
  {
    id: "dt-04",
    stage: "current-taste",
    trackTitle: "Kokoro",
    artist: "Rina Sawayama",
    genre: "Alt Pop",
    year: 2020,
    tags: ["Alt Pop", "Genre-bending"],
    durationSec: 221,
    energy: 66,
    familiarityScore: 86,
    discoveryScore: 14,
    explanation:
      "You've saved every Rina Sawayama single this year — genre-bending alt pop is a strong, recurring signal in your taste.",
    moods: ["Confident", "Euphoric"],
    activities: ["Party prep", "Commuting"],
  },

  // Bridge Artist
  {
    id: "dt-05",
    stage: "bridge-artist",
    trackTitle: "Right Side of My Neck",
    artist: "Faye Webster",
    genre: "Indie Folk",
    year: 2019,
    tags: ["Indie Folk", "Pedal Steel"],
    durationSec: 201,
    energy: 34,
    familiarityScore: 66,
    discoveryScore: 38,
    explanation:
      "Faye Webster shares Clairo's hushed, lo-fi production and slow-burn songwriting, but adds pedal steel and a more country-inflected voice — close enough to feel familiar, different enough to notice.",
    moods: ["Chill", "Melancholy", "Nostalgic"],
    activities: ["Winding down", "Late-night drive"],
  },
  {
    id: "dt-06",
    stage: "bridge-artist",
    trackTitle: "Selfish Soul",
    artist: "Sudan Archives",
    genre: "Experimental R&B",
    year: 2022,
    tags: ["Experimental R&B", "Violin-led"],
    durationSec: 214,
    energy: 61,
    familiarityScore: 58,
    discoveryScore: 47,
    explanation:
      "Sudan Archives keeps the R&B core you already love but replaces the guitar with looped violin — a genuine bridge from Steve Lacy's sound into something rawer.",
    moods: ["Confident", "Focused"],
    activities: ["Deep work", "Studying"],
  },
  {
    id: "dt-07",
    stage: "bridge-artist",
    trackTitle: "Skin Tight",
    artist: "Ravyn Lenae",
    genre: "Neo-Soul",
    year: 2024,
    tags: ["Neo-Soul", "Falsetto"],
    durationSec: 227,
    energy: 52,
    familiarityScore: 63,
    discoveryScore: 41,
    explanation:
      "Ravyn Lenae's falsetto-led neo-soul sits right between Omar Apollo's melodicism and a jazzier, more improvisational vocal style you haven't spent much time with.",
    moods: ["Romantic", "Chill"],
    activities: ["Cooking", "Winding down"],
  },
  {
    id: "dt-08",
    stage: "bridge-artist",
    trackTitle: "Blackout",
    artist: "Turnstile",
    genre: "Melodic Hardcore",
    year: 2021,
    tags: ["Melodic Hardcore", "High-energy"],
    durationSec: 178,
    energy: 88,
    familiarityScore: 51,
    discoveryScore: 52,
    explanation:
      "Turnstile takes the confident, hook-driven songwriting in your library and pushes the energy up into hardcore territory — the melodies keep it approachable.",
    moods: ["Energetic", "Confident"],
    activities: ["Working out", "Party prep"],
  },

  // Emerging Artist
  {
    id: "dt-09",
    stage: "emerging-artist",
    trackTitle: "Sister",
    artist: "TSHA",
    genre: "UK Garage",
    year: 2023,
    tags: ["UK Garage", "Electronic"],
    durationSec: 244,
    energy: 71,
    familiarityScore: 29,
    discoveryScore: 74,
    explanation:
      "TSHA's monthly listeners are up 340% in the last two quarters, still well below mainstream visibility — early access before this breaks wide.",
    moods: ["Energetic", "Euphoric"],
    activities: ["Party prep", "Commuting"],
  },
  {
    id: "dt-10",
    stage: "emerging-artist",
    trackTitle: "Deep End",
    artist: "Fousheé",
    genre: "Alt R&B / Punk",
    year: 2021,
    tags: ["Alt R&B", "Genre-bending"],
    durationSec: 196,
    energy: 74,
    familiarityScore: 33,
    discoveryScore: 69,
    explanation:
      "Fousheé swings between punk snarl and R&B tenderness in the same track — a rising artist whose genre-bending mirrors what already draws you to Rina Sawayama.",
    moods: ["Confident", "Energetic"],
    activities: ["Working out", "Party prep"],
  },
  {
    id: "dt-11",
    stage: "emerging-artist",
    trackTitle: "Sad Girlz Luv Money",
    artist: "Amaarae",
    genre: "Afrofusion",
    year: 2020,
    tags: ["Afrofusion", "Falsetto"],
    durationSec: 183,
    energy: 68,
    familiarityScore: 31,
    discoveryScore: 71,
    explanation:
      "Amaarae's featherlight falsetto over Afrofusion production has quietly built a global following — playlisted heavily by tastemakers, not yet by algorithms.",
    moods: ["Confident", "Euphoric"],
    activities: ["Party prep", "Cooking"],
  },
  {
    id: "dt-12",
    stage: "emerging-artist",
    trackTitle: "23",
    artist: "Wallice",
    genre: "Indie Pop",
    year: 2022,
    tags: ["Indie Pop", "Sharp lyrics"],
    durationSec: 174,
    energy: 63,
    familiarityScore: 36,
    discoveryScore: 66,
    explanation:
      "Wallice writes with the same wry, first-person specificity as Clairo, but with brighter production — an emerging voice in the exact lane you already favor.",
    moods: ["Confident", "Nostalgic"],
    activities: ["Commuting", "Studying"],
  },

  // Hidden Gem
  {
    id: "dt-13",
    stage: "hidden-gem",
    trackTitle: "Method Man",
    artist: "Nilüfer Yanya",
    genre: "Art Rock",
    year: 2022,
    tags: ["Art Rock", "Saxophone"],
    durationSec: 238,
    energy: 57,
    familiarityScore: 18,
    discoveryScore: 86,
    explanation:
      "Under 2M monthly listeners despite critical acclaim — Nilüfer Yanya's saxophone-laced art rock rarely surfaces in algorithmic feeds, but rewards exactly the close-listening habits your session history shows.",
    moods: ["Melancholy", "Focused"],
    activities: ["Deep work", "Late-night drive"],
  },
  {
    id: "dt-14",
    stage: "hidden-gem",
    trackTitle: "Take Two",
    artist: "L'Rain",
    genre: "Experimental Soul",
    year: 2022,
    tags: ["Experimental Soul", "Collage production"],
    durationSec: 205,
    energy: 44,
    familiarityScore: 12,
    discoveryScore: 91,
    explanation:
      "L'Rain layers found-sound and soul vocals into something closer to collage than songwriting — one of the least-streamed tracks in this journey, and one of the most rewarding on repeat listens.",
    moods: ["Melancholy", "Focused"],
    activities: ["Winding down", "Deep work"],
  },
  {
    id: "dt-15",
    stage: "hidden-gem",
    trackTitle: "Raingurl",
    artist: "Yaeji",
    genre: "Electronic",
    year: 2017,
    tags: ["Electronic", "Bilingual vocals"],
    durationSec: 189,
    energy: 65,
    familiarityScore: 21,
    discoveryScore: 82,
    explanation:
      "Yaeji's hushed, bilingual house tracks have a devoted underground following but almost no shelf placement — a deep cut that matches the low-key energy in your evening listening.",
    moods: ["Chill", "Confident"],
    activities: ["Late-night drive", "Winding down"],
  },
  {
    id: "dt-16",
    stage: "hidden-gem",
    trackTitle: "Truth Or Dare",
    artist: "Helena Deland",
    genre: "Dream Pop",
    year: 2020,
    tags: ["Dream Pop", "Atmospheric"],
    durationSec: 216,
    energy: 39,
    familiarityScore: 15,
    discoveryScore: 88,
    explanation:
      "Helena Deland's atmospheric dream pop shares Clairo's hush but almost never gets algorithmic placement — the kind of track you'd only find by going looking.",
    moods: ["Melancholy", "Romantic"],
    activities: ["Winding down", "Studying"],
  },

  // Genre Expansion
  {
    id: "dt-17",
    stage: "genre-expansion",
    trackTitle: "Space Is the Place",
    artist: "Ezra Collective",
    genre: "Jazz Fusion",
    year: 2023,
    tags: ["Jazz Fusion", "Live instrumentation"],
    durationSec: 267,
    energy: 76,
    familiarityScore: 8,
    discoveryScore: 96,
    explanation:
      "You've never streamed jazz fusion, but Ezra Collective's rhythm-forward, sample-adjacent style is the most approachable entry point given how much you value groove in your current favorites.",
    moods: ["Energetic", "Euphoric"],
    activities: ["Cooking", "Party prep"],
  },
  {
    id: "dt-18",
    stage: "genre-expansion",
    trackTitle: "Calm Down",
    artist: "Rema",
    genre: "Afrobeats",
    year: 2022,
    tags: ["Afrobeats", "Melodic"],
    durationSec: 219,
    energy: 70,
    familiarityScore: 6,
    discoveryScore: 94,
    explanation:
      "Afrobeats is entirely absent from your history, but Rema's melodic phrasing and mid-tempo groove overlap closely with the R&B textures you already stream daily.",
    moods: ["Confident", "Euphoric"],
    activities: ["Party prep", "Commuting"],
  },
  {
    id: "dt-19",
    stage: "genre-expansion",
    trackTitle: "money machine",
    artist: "100 gecs",
    genre: "Hyperpop",
    year: 2019,
    tags: ["Hyperpop", "Maximalist"],
    durationSec: 165,
    energy: 93,
    familiarityScore: 4,
    discoveryScore: 97,
    explanation:
      "A genuine leap — hyperpop's maximalist, glitched-out production is the furthest thing from your current library, picked specifically because your exploration setting is asking for a real jump, not a small one.",
    moods: ["Energetic", "Euphoric"],
    activities: ["Working out", "Party prep"],
  },
  {
    id: "dt-20",
    stage: "genre-expansion",
    trackTitle: "Danielle (smile on my face)",
    artist: "Fred again..",
    genre: "UK Dance",
    year: 2021,
    tags: ["UK Dance", "Sample-based"],
    durationSec: 178,
    energy: 80,
    familiarityScore: 9,
    discoveryScore: 92,
    explanation:
      "Fred again..'s sample-based UK dance is unlike anything in your rotation, but his vocal-chopping technique pulls directly from indie and R&B sources you already stream.",
    moods: ["Energetic", "Nostalgic"],
    activities: ["Late-night drive", "Party prep"],
  },
];

export const INITIAL_DISCOVERY_PROFILE: DiscoveryProfile = {
  preferredGenres: [
    { genre: "Bedroom Pop", weight: 82, accent: "blue" },
    { genre: "Alt R&B", weight: 76, accent: "purple" },
    { genre: "Indie Rock", weight: 61, accent: "pink" },
    { genre: "Neo-Soul", weight: 44, accent: "gold" },
  ],
  currentMood: "Chill",
  explorationLevel: 45,
  recentlyDiscovered: [
    { artist: "Ravyn Lenae", genre: "Neo-Soul", discoveredAt: "2026-06-18T00:00:00Z" },
    { artist: "Fousheé", genre: "Alt R&B / Punk", discoveredAt: "2026-06-27T00:00:00Z" },
  ],
  discoveryStreak: 6,
  comfortVsExploration: { comfort: 64, exploration: 36 },
  tasteEvolution: [
    {
      id: "te-01",
      date: "2026-06-02T00:00:00Z",
      label: "Started exploring Neo-Soul",
      detail: "Added after three consecutive skips of straight bedroom pop picks.",
    },
    {
      id: "te-02",
      date: "2026-06-18T00:00:00Z",
      label: "Discovered Ravyn Lenae",
      detail: "Saved from a Bridge Artist recommendation — now a top-5 played artist this month.",
    },
    {
      id: "te-03",
      date: "2026-06-27T00:00:00Z",
      label: "Discovered Fousheé",
      detail: "Saved from an Emerging Artist recommendation after a 'more like this' signal.",
    },
    {
      id: "te-04",
      date: "2026-07-01T00:00:00Z",
      label: "Exploration level rose to 45%",
      detail: "Three 'too familiar' signals in a row pushed the balance further from comfort.",
    },
  ],
};

export function getTracksByStage(): Record<string, DiscoveryTrack[]> {
  return DISCOVERY_TRACKS.reduce<Record<string, DiscoveryTrack[]>>((acc, track) => {
    (acc[track.stage] ??= []).push(track);
    return acc;
  }, {});
}

export function matchesMood(track: DiscoveryTrack, mood?: MoodChip): boolean {
  return mood ? track.moods.includes(mood) : false;
}

export function matchesActivity(track: DiscoveryTrack, activity?: ActivityChip): boolean {
  return activity ? track.activities.includes(activity) : false;
}
