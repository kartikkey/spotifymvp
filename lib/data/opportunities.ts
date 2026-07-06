import type { Opportunity, RiceInputs } from "@/lib/types";

function riceScore(rice: RiceInputs): number {
  return Math.round(((rice.reach * rice.impact * rice.confidence) / rice.effort) * 10) / 10;
}

function withScore(o: Omit<Opportunity, "riceScore">): Opportunity {
  return { ...o, riceScore: riceScore(o.rice) };
}

export const opportunities: Opportunity[] = [
  withScore({
    id: "opp-01",
    title: "Reduce redundant recommendations across Home shelves",
    summary:
      "Users see the same 6-8 tracks repeated across 'Made for you', 'Jump back in', and 'Recommended' shelves, flattening perceived variety on Home.",
    description:
      "Cross-shelf de-duplication analysis shows an average of 34% overlap between the top three Home shelves for daily active users. Insight #opp-linked shows CTR on 'Made for you' declining for four consecutive quarters even as underlying recommendation quality has improved, suggesting the repetition itself — not relevance — is the ceiling. Proposal: apply a cross-shelf de-duplication pass at render time, backfilling each shelf from the next-best candidate pool so no item appears twice above the fold.",
    productArea: "home-discovery",
    theme: "retention",
    status: "new",
    rice: { reach: 9, impact: 7, confidence: 8, effort: 4 },
    owner: "Priya Nair",
    createdAt: "2026-05-12T09:00:00Z",
    updatedAt: "2026-06-18T14:20:00Z",
    linkedInsightIds: ["ins-07"],
    linkedFeedbackIds: [],
    activity: [
      {
        id: "act-01-1",
        type: "created",
        author: "Priya Nair",
        timestamp: "2026-05-12T09:00:00Z",
        message: "Opportunity drafted from Q2 Home shelf overlap analysis.",
      },
      {
        id: "act-01-2",
        type: "comment",
        author: "Marcus Webb",
        timestamp: "2026-06-18T14:20:00Z",
        message:
          "Flagging that this overlaps with the ranking team's re-ranking experiment (exp-05). Worth sequencing after their results land.",
      },
    ],
  }),
  withScore({
    id: "opp-02",
    title: "Surface concert tickets inside artist radio flow",
    summary:
      "Users listening to an artist's radio station with an upcoming show nearby never see a ticket prompt unless they visit the artist page directly.",
    description:
      "Insight #ins-09 shows ticket click-through is 2.4x higher for users with 3+ saved artists in a metro area — but today that intent signal is only surfaced on the artist profile, not in the much higher-traffic radio/autoplay context. Proposal: a dismissible inline card in the Now Playing queue when an artist with a nearby show enters radio rotation, reusing the existing Live Events card component.",
    productArea: "live-events",
    theme: "monetization",
    status: "planned",
    rice: { reach: 7, impact: 8, confidence: 7, effort: 5 },
    owner: "Daniel Osei",
    createdAt: "2026-04-02T11:15:00Z",
    updatedAt: "2026-06-25T16:45:00Z",
    linkedInsightIds: ["ins-09"],
    linkedFeedbackIds: ["fb-14"],
    activity: [
      {
        id: "act-02-1",
        type: "created",
        author: "Daniel Osei",
        timestamp: "2026-04-02T11:15:00Z",
        message: "Opportunity opened following Live Events Q2 planning review.",
      },
      {
        id: "act-02-2",
        type: "status-change",
        author: "Daniel Osei",
        timestamp: "2026-06-25T16:45:00Z",
        message: "Moved to Planned after ticketing partnership team confirmed API capacity.",
        fromStatus: "in-review",
        toStatus: "planned",
      },
    ],
  }),
  withScore({
    id: "opp-03",
    title: "Auto-generate podcast chapters from transcription",
    summary:
      "Fewer than 12% of podcast episodes have manually authored chapters, leaving most listeners without a way to skip to the segment they want.",
    description:
      "We already run full-episode transcription for search indexing. Proposal: extend that pipeline with a topic-segmentation model to auto-generate chapter markers for any episode lacking them, with creators able to edit or reject before publish. exp-02's early read shows chapter previews lift median completion by 6.1% — this closes the long tail where chapters simply don't exist yet.",
    productArea: "podcasts",
    theme: "engagement",
    status: "in-review",
    rice: { reach: 8, impact: 7, confidence: 6, effort: 6 },
    owner: "Lena Vogt",
    createdAt: "2026-05-20T13:00:00Z",
    updatedAt: "2026-06-30T10:10:00Z",
    linkedInsightIds: [],
    linkedFeedbackIds: ["fb-02", "fb-19"],
    activity: [
      {
        id: "act-03-1",
        type: "created",
        author: "Lena Vogt",
        timestamp: "2026-05-20T13:00:00Z",
        message: "Drafted after reviewing exp-02 chapter preview results.",
      },
      {
        id: "act-03-2",
        type: "comment",
        author: "Tom Reilly",
        timestamp: "2026-06-30T10:10:00Z",
        message: "ML platform team estimates 3 weeks for the segmentation model fine-tune. Adjusting effort score up.",
      },
    ],
  }),
  withScore({
    id: "opp-04",
    title: "Self-serve seat management for Family Plan",
    summary:
      "Removing or replacing a Family Plan member required a support ticket, driving 9% of all Premium support contacts.",
    description:
      "Shipped in Q1. Plan owners can now add, remove, and re-invite up to 5 members directly from Account settings, with address re-verification handled inline instead of via email round-trip. Support contact volume for family plan management dropped 71% in the first 6 weeks post-launch.",
    productArea: "premium-monetization",
    theme: "monetization",
    status: "shipped",
    rice: { reach: 6, impact: 6, confidence: 9, effort: 3 },
    owner: "Sofia Marchetti",
    createdAt: "2026-01-08T09:30:00Z",
    updatedAt: "2026-03-14T17:00:00Z",
    linkedInsightIds: ["ins-04"],
    linkedFeedbackIds: [],
    activity: [
      {
        id: "act-04-1",
        type: "created",
        author: "Sofia Marchetti",
        timestamp: "2026-01-08T09:30:00Z",
        message: "Opportunity created from support-ticket volume review.",
      },
      {
        id: "act-04-2",
        type: "status-change",
        author: "Sofia Marchetti",
        timestamp: "2026-02-20T12:00:00Z",
        message: "Design and eng scoped, moving to In Progress.",
        fromStatus: "planned",
        toStatus: "in-progress",
      },
      {
        id: "act-04-3",
        type: "status-change",
        author: "Sofia Marchetti",
        timestamp: "2026-03-14T17:00:00Z",
        message: "Shipped to 100% of Family Plan owners.",
        fromStatus: "in-progress",
        toStatus: "shipped",
      },
    ],
  }),
  withScore({
    id: "opp-05",
    title: "Add explicit like/skip feedback loop to DJ",
    summary:
      "DJ has no lightweight way to say \"more like this\" mid-session — users either let a track play out or skip, with no signal captured about the commentary itself.",
    description:
      "ins-05 shows DJ users renew Premium at 2.3x the base rate, but qualitative feedback (fb-05, fb-11) repeatedly asks for a way to react to the commentary, not just the music. Proposal: add a subtle thumbs affordance to the DJ now-playing card, feeding directly into the persona tuning model.",
    productArea: "dj",
    theme: "engagement",
    status: "in-progress",
    rice: { reach: 7, impact: 6, confidence: 7, effort: 4 },
    owner: "Ravi Chandran",
    createdAt: "2026-03-25T08:45:00Z",
    updatedAt: "2026-07-01T09:00:00Z",
    linkedInsightIds: ["ins-02", "ins-05"],
    linkedFeedbackIds: ["fb-05", "fb-11"],
    activity: [
      {
        id: "act-05-1",
        type: "created",
        author: "Ravi Chandran",
        timestamp: "2026-03-25T08:45:00Z",
        message: "Opportunity created from recurring DJ feedback theme.",
      },
      {
        id: "act-05-2",
        type: "status-change",
        author: "Ravi Chandran",
        timestamp: "2026-05-10T11:00:00Z",
        message: "Design review complete, entering build.",
        fromStatus: "planned",
        toStatus: "in-progress",
      },
    ],
  }),
  withScore({
    id: "opp-06",
    title: "Post-concert setlist auto-added to a private playlist",
    summary:
      "After attending a show tracked in Live Events, users have no easy way to relive the setlist — today they'd have to reconstruct it manually.",
    description:
      "Pairs the Live Events RSVP/attendance signal with publicly available setlist data to auto-generate a private 'You were there' playlist within 24 hours of a show ending. Early signal from ins-03 shows Live Events engagement responds well to timely, personalized nudges.",
    productArea: "live-events",
    theme: "discovery",
    status: "new",
    rice: { reach: 5, impact: 6, confidence: 6, effort: 4 },
    owner: "Daniel Osei",
    createdAt: "2026-06-05T10:00:00Z",
    updatedAt: "2026-06-05T10:00:00Z",
    linkedInsightIds: ["ins-03"],
    linkedFeedbackIds: [],
    activity: [
      {
        id: "act-06-1",
        type: "created",
        author: "Daniel Osei",
        timestamp: "2026-06-05T10:00:00Z",
        message: "Drafted as a low-effort follow-on to the Live Events push timing experiment.",
      },
    ],
  }),
  withScore({
    id: "opp-07",
    title: "Auto-crop podcast video into shareable vertical clips",
    summary:
      "Creators want short vertical clips for external sharing, but manual editing is the single largest cited blocker to posting video episodes at all.",
    description:
      "fb-19 and three separate creator advisory board sessions cite manual clipping as the top reason creators skip video entirely. Proposal: auto-suggest 3 candidate 30-60s vertical clips per episode using the existing transcript + audio-energy signal, ready to export or share directly to Stories-style formats.",
    productArea: "podcasts",
    theme: "discovery",
    status: "planned",
    rice: { reach: 6, impact: 7, confidence: 5, effort: 7 },
    owner: "Lena Vogt",
    createdAt: "2026-04-28T15:20:00Z",
    updatedAt: "2026-06-10T09:00:00Z",
    linkedInsightIds: ["ins-06"],
    linkedFeedbackIds: ["fb-19"],
    activity: [
      {
        id: "act-07-1",
        type: "created",
        author: "Lena Vogt",
        timestamp: "2026-04-28T15:20:00Z",
        message: "Created from creator advisory board notes.",
      },
    ],
  }),
  withScore({
    id: "opp-08",
    title: "Single-step student discount re-verification",
    summary:
      "Annual student re-verification requires a document upload step that accounts for the majority of drop-off in an otherwise short flow.",
    description:
      "ins-08 shows 61% of re-verification abandonment happens at the document upload screen specifically, not earlier in the flow. Proposal: partner with SheerID's instant-match API to skip document upload entirely for the ~70% of students whose enrollment can be confirmed instantly, reserving upload only as a fallback.",
    productArea: "premium-monetization",
    theme: "monetization",
    status: "in-review",
    rice: { reach: 6, impact: 8, confidence: 7, effort: 4 },
    owner: "Sofia Marchetti",
    createdAt: "2026-05-30T09:00:00Z",
    updatedAt: "2026-06-28T13:30:00Z",
    linkedInsightIds: ["ins-08"],
    linkedFeedbackIds: ["fb-08"],
    activity: [
      {
        id: "act-08-1",
        type: "created",
        author: "Sofia Marchetti",
        timestamp: "2026-05-30T09:00:00Z",
        message: "Opportunity created from re-verification funnel analysis.",
      },
      {
        id: "act-08-2",
        type: "comment",
        author: "Ken Ibrahim",
        timestamp: "2026-06-28T13:30:00Z",
        message: "Legal has cleared the SheerID instant-match data-sharing terms. Ready to move to Planned once eng capacity opens.",
      },
    ],
  }),
  withScore({
    id: "opp-09",
    title: "Cross-device queue handoff, mobile to desktop",
    summary:
      "Switching listening from mobile to desktop mid-session drops the queue entirely roughly one time in five, forcing users to rebuild it manually.",
    description:
      "ins-10 traces the drop-off to a race condition between Connect's session handoff and queue-state sync when the two happen within the same 2-second window. Proposal: sequence queue-state sync to complete before the handoff acknowledgement is sent, adding at most 200ms of perceived latency.",
    productArea: "home-discovery",
    theme: "platform",
    status: "planned",
    rice: { reach: 7, impact: 5, confidence: 8, effort: 3 },
    owner: "Marcus Webb",
    createdAt: "2026-06-01T14:00:00Z",
    updatedAt: "2026-06-20T11:00:00Z",
    linkedInsightIds: ["ins-10"],
    linkedFeedbackIds: [],
    activity: [
      {
        id: "act-09-1",
        type: "created",
        author: "Marcus Webb",
        timestamp: "2026-06-01T14:00:00Z",
        message: "Root cause confirmed by Platform team, opportunity opened to prioritize the fix.",
      },
    ],
  }),
  withScore({
    id: "opp-10",
    title: "Expand DJ Beta to 10 additional markets",
    summary:
      "DJ remains English-only and available in a limited set of markets despite strong engagement lift wherever it's live.",
    description:
      "Proposal to expand DJ to 10 additional English-speaking and localized-commentary markets over two quarters, sequenced by existing podcast-market TTS voice availability. Reuses the persona and commentary generation pipeline already in production.",
    productArea: "dj",
    theme: "discovery",
    status: "in-review",
    rice: { reach: 8, impact: 8, confidence: 6, effort: 8 },
    owner: "Ravi Chandran",
    createdAt: "2026-05-15T10:30:00Z",
    updatedAt: "2026-06-22T15:00:00Z",
    linkedInsightIds: ["ins-02"],
    linkedFeedbackIds: [],
    activity: [
      {
        id: "act-10-1",
        type: "created",
        author: "Ravi Chandran",
        timestamp: "2026-05-15T10:30:00Z",
        message: "Opportunity opened alongside international expansion roadmap review.",
      },
    ],
  }),
  withScore({
    id: "opp-11",
    title: "Chapter-preview nudges to lift podcast completion",
    summary:
      "Listeners who preview an episode's chapter list before pressing play complete episodes at a meaningfully higher rate, but chapters are hidden until playback starts.",
    description:
      "exp-02 confirmed a 6.1% completion lift from surfacing chapter previews on the episode card itself rather than only inside the player. Proposal: roll this out permanently across all episode surfaces (search results, show page, Home shelves), not just the experiment's single placement.",
    productArea: "podcasts",
    theme: "retention",
    status: "new",
    rice: { reach: 8, impact: 6, confidence: 9, effort: 3 },
    owner: "Lena Vogt",
    createdAt: "2026-06-27T09:00:00Z",
    updatedAt: "2026-06-27T09:00:00Z",
    linkedInsightIds: [],
    linkedFeedbackIds: [],
    activity: [
      {
        id: "act-11-1",
        type: "created",
        author: "Lena Vogt",
        timestamp: "2026-06-27T09:00:00Z",
        message: "Opened directly from exp-02's completed readout.",
      },
    ],
  }),
  withScore({
    id: "opp-12",
    title: "Localize DJ commentary into 5 non-English languages",
    summary:
      "DJ commentary generation currently only ships in English, blocking the feature for the majority of eligible markets outside expansion plans.",
    description:
      "Distinct from opp-10's market expansion (which reuses existing TTS voices) — this is the underlying commentary-generation localization work required before any non-English market can launch at all. Sequencing dependency for opp-10's later phases.",
    productArea: "dj",
    theme: "platform",
    status: "new",
    rice: { reach: 6, impact: 7, confidence: 5, effort: 9 },
    owner: "Ravi Chandran",
    createdAt: "2026-06-30T12:00:00Z",
    updatedAt: "2026-06-30T12:00:00Z",
    linkedInsightIds: [],
    linkedFeedbackIds: [],
    activity: [
      {
        id: "act-12-1",
        type: "created",
        author: "Ravi Chandran",
        timestamp: "2026-06-30T12:00:00Z",
        message: "Opened as a dependency for DJ international expansion.",
      },
    ],
  }),
];

export function getOpportunityById(id: string): Opportunity | undefined {
  return opportunities.find((o) => o.id === id);
}
