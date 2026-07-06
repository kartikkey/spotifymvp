import type { Insight } from "@/lib/types";

const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];

function series(values: number[]) {
  return values.map((value, i) => ({ date: MONTHS[i], value }));
}

export const insights: Insight[] = [
  {
    id: "ins-01",
    headline: "Podcast retention dropped 4.2% in APAC after the autoplay-next change",
    summary:
      "The March autoplay-next rollout correlates with a sustained retention dip specific to APAC markets, not seen in EU or NA cohorts.",
    body:
      "Weekly podcast retention in APAC fell from 61.8% to 59.2% in the four weeks following the autoplay-next rollout, while EU and NA cohorts held flat over the same window. The effect is concentrated in listeners under 25, who over-index on single-episode listening in APAC. Recommend a market-level autoplay opt-out default while the ranking team investigates whether the successor-episode model needs regional tuning.",
    productArea: "podcasts",
    theme: "retention",
    confidence: "high",
    sourceTags: ["Retention cohort analysis", "APAC market review"],
    metric: {
      label: "APAC weekly podcast retention",
      value: "59.2%",
      delta: -4.2,
      series: series([61.5, 61.8, 61.6, 60.4, 59.6, 59.2]),
    },
    createdAt: "2026-06-29T08:00:00Z",
    convertedToOpportunity: false,
  },
  {
    id: "ins-02",
    headline: "DJ drives 18% higher session length among Gen Z users",
    summary:
      "Sessions initiated via DJ run meaningfully longer than sessions started from any other entry point, most pronounced in the 18-24 cohort.",
    body:
      "Median session length for DJ-initiated sessions is 34.6 minutes versus 29.3 minutes for sessions started from search or Home, an 18.1% lift concentrated in users aged 18-24. The gap holds after controlling for existing engagement level, suggesting the format itself — not just self-selection into trying it — is driving the effect.",
    productArea: "dj",
    theme: "engagement",
    confidence: "high",
    sourceTags: ["Session length analysis", "Gen Z cohort study"],
    metric: {
      label: "DJ session length lift vs. baseline",
      value: "+18.1%",
      delta: 18.1,
      series: series([9.4, 11.2, 13.8, 15.6, 17.0, 18.1]),
    },
    createdAt: "2026-06-15T08:00:00Z",
    relatedOpportunityId: "opp-05",
    convertedToOpportunity: true,
  },
  {
    id: "ins-03",
    headline: "Live Events tab clicks up 31% following in-app push test",
    summary:
      "A single timely push about a nearby show drove a sustained lift in Live Events tab engagement, not just a same-day spike.",
    body:
      "The Friday 5pm push variant in exp-03 produced a 31% lift in Live Events tab clicks that persisted through the following week, rather than decaying to baseline after 24 hours as most push campaigns do. This suggests the tab itself was previously under-discovered rather than uninteresting once found.",
    productArea: "live-events",
    theme: "discovery",
    confidence: "medium",
    sourceTags: ["exp-03 readout", "Push engagement funnel"],
    metric: {
      label: "Live Events tab click-through",
      value: "+31%",
      delta: 31,
      series: series([4.1, 4.3, 4.0, 4.6, 5.9, 5.4]),
    },
    createdAt: "2026-06-08T08:00:00Z",
    relatedOpportunityId: "opp-06",
    convertedToOpportunity: true,
  },
  {
    id: "ins-04",
    headline: "Family Plan churn concentrated in the first 60 days",
    summary:
      "Nearly half of all Family Plan cancellations happen before the second billing cycle, tracing back to member-management friction.",
    body:
      "48% of Family Plan cancellations in the trailing twelve months occurred within the first 60 days of signup. Support ticket analysis attributes a majority of early cancellations to failed attempts at adding or removing household members, rather than price or product dissatisfaction.",
    productArea: "premium-monetization",
    theme: "monetization",
    confidence: "high",
    sourceTags: ["Churn cohort analysis", "Support ticket taxonomy"],
    metric: {
      label: "Family Plan 60-day churn share",
      value: "48%",
      delta: -12,
      series: series([60, 58, 55, 51, 49, 48]),
    },
    createdAt: "2026-01-05T08:00:00Z",
    relatedOpportunityId: "opp-04",
    convertedToOpportunity: true,
  },
  {
    id: "ins-05",
    headline: "DJ users renew Premium at 2.3x the base rate",
    summary:
      "Enabling DJ at least once in the trial period is the single strongest predictor of trial-to-paid conversion we've measured this year.",
    body:
      "Trial users who engage with DJ at least once convert to paid Premium at 2.3x the rate of trial users who don't, holding constant for genre preference, region, and device. The effect size exceeds every other engagement feature tested this year, including Blend and Wrapped.",
    productArea: "dj",
    theme: "retention",
    confidence: "high",
    sourceTags: ["Trial conversion model", "Feature engagement regression"],
    metric: {
      label: "Trial-to-paid conversion multiplier",
      value: "2.3x",
      delta: 2.3,
      series: series([1.6, 1.8, 1.9, 2.0, 2.2, 2.3]),
    },
    createdAt: "2026-05-22T08:00:00Z",
    relatedOpportunityId: "opp-05",
    convertedToOpportunity: true,
  },
  {
    id: "ins-06",
    headline: "Podcast video adoption lags on Android versus iOS",
    summary:
      "Video podcast play rate on Android trails iOS by more than 2x, despite comparable catalog availability across both platforms.",
    body:
      "Only 8.4% of eligible Android sessions play a video episode versus 19.1% on iOS. Device-tier analysis suggests the gap is concentrated on mid-tier Android hardware, where video episode thumbnails load noticeably slower — likely suppressing discovery rather than reflecting genuine preference against video.",
    productArea: "podcasts",
    theme: "platform",
    confidence: "medium",
    sourceTags: ["Platform parity review", "Device-tier performance audit"],
    metric: {
      label: "Android video play rate vs. iOS",
      value: "8.4%",
      delta: -10.7,
      series: series([9.8, 9.5, 9.1, 8.9, 8.6, 8.4]),
    },
    createdAt: "2026-04-18T08:00:00Z",
    relatedOpportunityId: "opp-07",
    convertedToOpportunity: true,
  },
  {
    id: "ins-07",
    headline: "'Made for you' shelf CTR declining for four straight quarters",
    summary:
      "Click-through on the top Home shelf keeps falling even as underlying recommendation relevance scores hold steady or improve.",
    body:
      "'Made for you' CTR has fallen from 14.2% to 10.6% over four consecutive quarters despite the recommendation model's offline relevance metrics improving over the same period. Cross-shelf overlap analysis shows 34% of items also appear in 'Jump back in' or 'Recommended radio', pointing to perceived repetition rather than relevance as the likely driver.",
    productArea: "home-discovery",
    theme: "discovery",
    confidence: "high",
    sourceTags: ["Home shelf performance review", "Cross-shelf overlap audit"],
    metric: {
      label: "'Made for you' click-through rate",
      value: "10.6%",
      delta: -25.4,
      series: series([14.2, 13.1, 12.4, 11.5, 11.0, 10.6]),
    },
    createdAt: "2026-06-20T08:00:00Z",
    relatedOpportunityId: "opp-01",
    convertedToOpportunity: true,
  },
  {
    id: "ins-08",
    headline: "Student re-verification abandonment spikes at document upload",
    summary:
      "The annual student discount re-verification flow loses most of its drop-off at a single step: uploading enrollment proof.",
    body:
      "61% of all re-verification abandonment occurs at the document upload screen, more than every other step in the flow combined. Session replay review shows most users leave within 15 seconds of reaching the screen, consistent with not having a document readily available rather than a usability problem with the upload UI itself.",
    productArea: "premium-monetization",
    theme: "monetization",
    confidence: "high",
    sourceTags: ["Funnel drop-off analysis", "Session replay review"],
    metric: {
      label: "Abandonment share at document upload",
      value: "61%",
      delta: 8,
      series: series([52, 54, 57, 58, 60, 61]),
    },
    createdAt: "2026-06-02T08:00:00Z",
    relatedOpportunityId: "opp-08",
    convertedToOpportunity: true,
  },
  {
    id: "ins-09",
    headline: "Concert ticket CTR highest for users with 3+ saved artists in a metro",
    summary:
      "Ticket click-through scales strongly with how many saved artists a user has playing in their metro area, not just whether they saved the touring artist.",
    body:
      "Users with 3 or more saved artists holding shows in their metro area click through to tickets at 2.4x the rate of users with only the touring artist saved. This local-density signal is currently unused outside the artist page itself — it isn't factored into any push, radio, or queue-based ticket surfacing.",
    productArea: "live-events",
    theme: "monetization",
    confidence: "medium",
    sourceTags: ["Ticketing funnel analysis", "Metro density study"],
    metric: {
      label: "Ticket CTR multiplier (3+ saved artists)",
      value: "2.4x",
      delta: 2.4,
      series: series([1.7, 1.8, 2.0, 2.1, 2.3, 2.4]),
    },
    createdAt: "2026-05-27T08:00:00Z",
    relatedOpportunityId: "opp-02",
    convertedToOpportunity: true,
  },
  {
    id: "ins-10",
    headline: "Cross-device queue drop-off on mobile-to-desktop handoff",
    summary:
      "Roughly one in five Connect handoffs from mobile to desktop lose the active queue, forcing users to rebuild it manually.",
    body:
      "19.6% of mobile-to-desktop Connect handoffs result in an empty or truncated queue on the receiving device. Engineering traced the root cause to a race condition between session handoff acknowledgement and queue-state sync when both fire within a 2-second window, which occurs disproportionately on faster networks.",
    productArea: "home-discovery",
    theme: "platform",
    confidence: "medium",
    sourceTags: ["Connect reliability audit", "Platform engineering trace"],
    metric: {
      label: "Handoff queue-loss rate",
      value: "19.6%",
      delta: 3.1,
      series: series([15.8, 16.4, 17.1, 18.0, 18.9, 19.6]),
    },
    createdAt: "2026-06-12T08:00:00Z",
    relatedOpportunityId: "opp-09",
    convertedToOpportunity: true,
  },
  {
    id: "ins-11",
    headline: "Podcast episodes under 20 minutes complete 22% more often",
    summary:
      "Shorter episodes finish at a substantially higher rate than long-form content, independent of genre.",
    body:
      "Episodes under 20 minutes see a 68% completion rate versus 46% for episodes over 45 minutes, a gap that holds within every genre category we tested. This doesn't argue for shorter content across the board, but suggests completion-rate-based ranking should normalize by episode length rather than penalizing long-form shows outright.",
    productArea: "podcasts",
    theme: "engagement",
    confidence: "medium",
    sourceTags: ["Completion rate analysis", "Episode-length normalization study"],
    metric: {
      label: "Completion rate, sub-20-minute episodes",
      value: "68%",
      delta: 22,
      series: series([61, 63, 64, 66, 67, 68]),
    },
    createdAt: "2026-06-24T08:00:00Z",
    convertedToOpportunity: false,
  },
  {
    id: "ins-12",
    headline: "Live Event attendees churn 40% less within 90 days",
    summary:
      "Premium subscribers who attend a tracked live event show a substantially lower 90-day churn rate than matched non-attendees.",
    body:
      "Premium subscribers who attend at least one Live Event tracked through the app churn at 40% the rate of a matched cohort of non-attendees over the following 90 days. The effect holds after controlling for tenure and listening frequency, suggesting live attendance itself — not just being an engaged listener — carries retention value.",
    productArea: "live-events",
    theme: "retention",
    confidence: "high",
    sourceTags: ["Churn cohort analysis", "Live Events attendance matching study"],
    metric: {
      label: "90-day churn, event attendees vs. matched cohort",
      value: "-40%",
      delta: -40,
      series: series([-22, -28, -31, -35, -38, -40]),
    },
    createdAt: "2026-06-30T08:00:00Z",
    convertedToOpportunity: false,
  },
];

export function getInsightById(id: string): Insight | undefined {
  return insights.find((i) => i.id === id);
}
