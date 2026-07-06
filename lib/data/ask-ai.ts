export interface AskAIEntry {
  id: string;
  question: string;
  answer: string;
  linkHref: string;
  linkLabel: string;
}

/**
 * Canned Q&A backing the command palette's "Ask AI" mode. A real
 * implementation would send `question` to an LLM with retrieval over
 * lib/data and return a generated answer — this stands in for that call so
 * the interaction is demoable without a live backend.
 */
export const ASK_AI_ENTRIES: AskAIEntry[] = [
  {
    id: "qa-01",
    question: "Why did podcast retention drop in APAC?",
    answer:
      "Weekly podcast retention in APAC fell from 61.8% to 59.2% over four weeks, starting right after the March autoplay-next rollout. EU and NA cohorts held flat over the same period, and the effect concentrates in listeners under 25. Recommendation: a market-level autoplay opt-out default while ranking investigates regional tuning.",
    linkHref: "/insights",
    linkLabel: "View in AI Insights",
  },
  {
    id: "qa-02",
    question: "What's our top opportunity right now?",
    answer:
      "By RICE score, it's rolling out chapter-preview nudges across all podcast surfaces — reach and confidence are both high since exp-02 already confirmed a 6.1% completion lift, and effort is low because it's reusing an existing experiment placement.",
    linkHref: "/opportunities/opp-11",
    linkLabel: "Open opportunity",
  },
  {
    id: "qa-03",
    question: "How is the DJ feature performing?",
    answer:
      "Strongly. DJ-initiated sessions run 18.1% longer than sessions started elsewhere, concentrated in the 18-24 cohort, and trial users who engage with DJ convert to paid Premium at 2.3x the base rate — the strongest engagement-to-conversion signal we've measured this year.",
    linkHref: "/opportunities/opp-05",
    linkLabel: "View related opportunity",
  },
  {
    id: "qa-04",
    question: "What experiments are ready to ship?",
    answer:
      "The Family Plan self-serve seat invite flow (exp-04) is cleared for full rollout — it cut support contact rate for plan management by 66.3% in testing with no drop in activation.",
    linkHref: "/experiments/exp-04",
    linkLabel: "Open experiment",
  },
  {
    id: "qa-05",
    question: "What are users saying about Live Events?",
    answer:
      "Mostly positive — the strongest praise is for surfacing tickets directly in-app during radio playback, and for the post-show setlist playlist. The main gap called out is ticket recommendations skewing toward big-name artists over smaller ones users actually follow.",
    linkHref: "/feedback",
    linkLabel: "View feedback",
  },
  {
    id: "qa-06",
    question: "Why is 90-day retention declining?",
    answer:
      "It's down 1.2% quarter over quarter, and the clearest contributing signal is the 'Made for you' Home shelf — its click-through has fallen 25% over four quarters as cross-shelf overlap grew to 34%, making recommendations feel repetitive even though relevance scores improved.",
    linkHref: "/opportunities/opp-01",
    linkLabel: "View related opportunity",
  },
];
