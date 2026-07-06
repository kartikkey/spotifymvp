import type { Experiment, ExperimentSeriesPoint } from "@/lib/types";

function buildSeries(
  dates: string[],
  control: number[],
  treatment: number[]
): ExperimentSeriesPoint[] {
  return dates.map((date, i) => ({ date, control: control[i], treatment: treatment[i] }));
}

const WEEKS_8 = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8"];

export const experiments: Experiment[] = [
  {
    id: "exp-01",
    name: "DJ auto-play after playlist ends",
    hypothesis:
      "If DJ automatically continues with commentary when a playlist finishes instead of silently shuffling, session length after playlist completion will increase without hurting satisfaction.",
    productArea: "dj",
    theme: "engagement",
    status: "running",
    primaryMetricName: "Post-playlist session length",
    primaryMetricUnit: "min",
    controlValue: 8.2,
    treatmentValue: 11.6,
    liftPercent: 41.5,
    isSignificant: false,
    sampleSize: 214000,
    startDate: "2026-06-08",
    series: buildSeries(
      WEEKS_8,
      [8.0, 8.1, 8.3, 8.1, 8.4, 8.2, 8.3, 8.2],
      [8.1, 9.0, 9.8, 10.4, 10.9, 11.2, 11.4, 11.6]
    ),
    owner: "Ravi Chandran",
  },
  {
    id: "exp-02",
    name: "Chapter previews on episode card",
    hypothesis:
      "If listeners can see chapter titles on the episode card before pressing play, they'll have clearer expectations and complete more of the episode.",
    productArea: "podcasts",
    theme: "engagement",
    status: "completed",
    primaryMetricName: "Episode completion rate",
    primaryMetricUnit: "%",
    controlValue: 52.4,
    treatmentValue: 55.6,
    liftPercent: 6.1,
    isSignificant: true,
    sampleSize: 480000,
    startDate: "2026-04-06",
    endDate: "2026-05-04",
    conclusion:
      "Statistically significant 6.1% relative lift in completion rate with no change in skip-forward rate, meaning the lift reflects better expectation-setting rather than listeners skimming to chapters they already knew about. Recommended for permanent rollout (see opp-11).",
    series: buildSeries(
      WEEKS_8,
      [52.1, 52.6, 52.0, 52.8, 52.3, 52.5, 52.4, 52.6],
      [52.3, 53.1, 54.0, 54.6, 55.0, 55.3, 55.5, 55.6]
    ),
    owner: "Lena Vogt",
  },
  {
    id: "exp-03",
    name: "Live Events push timing: Friday 5pm vs. Saturday 10am",
    hypothesis:
      "If we send the weekly nearby-shows push on Friday evening instead of Saturday morning, users will have more lead time to plan and click through at a higher rate.",
    productArea: "live-events",
    theme: "discovery",
    status: "completed",
    primaryMetricName: "Live Events tab click-through",
    primaryMetricUnit: "%",
    controlValue: 4.1,
    treatmentValue: 5.4,
    liftPercent: 31.7,
    isSignificant: true,
    sampleSize: 350000,
    startDate: "2026-05-11",
    endDate: "2026-06-08",
    conclusion:
      "Friday 5pm send produced a statistically significant 31.7% lift in click-through that held for the full week after send, not just the first 24 hours. Rolled out as the new default send time for all markets.",
    series: buildSeries(
      WEEKS_8,
      [4.0, 4.2, 4.1, 4.0, 4.2, 4.1, 4.0, 4.1],
      [4.3, 4.8, 5.1, 5.2, 5.3, 5.4, 5.3, 5.4]
    ),
    owner: "Daniel Osei",
  },
  {
    id: "exp-04",
    name: "Family Plan self-serve seat invite flow",
    hypothesis:
      "If Family Plan owners can invite, remove, and re-invite members directly in-app, support contacts for plan management will drop and early cancellations will decrease.",
    productArea: "premium-monetization",
    theme: "monetization",
    status: "ready-to-ship",
    primaryMetricName: "Family Plan support contact rate",
    primaryMetricUnit: "%",
    controlValue: 9.2,
    treatmentValue: 3.1,
    liftPercent: -66.3,
    isSignificant: true,
    sampleSize: 128000,
    startDate: "2026-06-15",
    endDate: "2026-06-29",
    conclusion:
      "Support contact rate for plan management dropped 66.3% in the treatment group with no negative effect on activation. Cleared for full rollout; this became opp-04.",
    series: buildSeries(
      WEEKS_8.slice(0, 6),
      [9.4, 9.1, 9.3, 9.0, 9.2, 9.1],
      [9.3, 6.8, 4.9, 3.8, 3.3, 3.1]
    ),
    owner: "Sofia Marchetti",
  },
  {
    id: "exp-05",
    name: "Home feed shelf re-ranking with diversity boost",
    hypothesis:
      "If we penalize duplicate items across the top three Home shelves at ranking time instead of just at render time, perceived variety and shelf CTR will both improve.",
    productArea: "home-discovery",
    theme: "discovery",
    status: "running",
    primaryMetricName: "'Made for you' click-through rate",
    primaryMetricUnit: "%",
    controlValue: 10.6,
    treatmentValue: 12.1,
    liftPercent: 14.2,
    isSignificant: false,
    sampleSize: 610000,
    startDate: "2026-06-22",
    series: buildSeries(
      WEEKS_8.slice(0, 3),
      [10.5, 10.7, 10.6],
      [10.8, 11.6, 12.1]
    ),
    owner: "Priya Nair",
  },
  {
    id: "exp-06",
    name: "Student discount single-step re-verification",
    hypothesis:
      "If we use SheerID's instant-match to confirm enrollment for eligible students, most will skip document upload entirely and re-verification completion will rise.",
    productArea: "premium-monetization",
    theme: "monetization",
    status: "completed",
    primaryMetricName: "Re-verification completion rate",
    primaryMetricUnit: "%",
    controlValue: 61.0,
    treatmentValue: 84.5,
    liftPercent: 38.5,
    isSignificant: true,
    sampleSize: 96000,
    startDate: "2026-03-02",
    endDate: "2026-03-30",
    conclusion:
      "Instant-match resolved 69% of students without any document upload, lifting overall completion 38.5%. Became the basis for opp-08's full proposal.",
    series: buildSeries(
      WEEKS_8.slice(0, 5),
      [60.5, 61.4, 60.8, 61.2, 61.0],
      [68.2, 75.6, 80.1, 82.9, 84.5]
    ),
    owner: "Sofia Marchetti",
  },
  {
    id: "exp-07",
    name: "DJ voice persona selection at onboarding",
    hypothesis:
      "If new users pick a DJ voice persona during onboarding instead of receiving a default, they'll engage with DJ more in their first week.",
    productArea: "dj",
    theme: "engagement",
    status: "killed",
    primaryMetricName: "First-week DJ engagement rate",
    primaryMetricUnit: "%",
    controlValue: 22.4,
    treatmentValue: 22.9,
    liftPercent: 2.2,
    isSignificant: false,
    sampleSize: 142000,
    startDate: "2026-02-09",
    endDate: "2026-03-09",
    conclusion:
      "No significant lift, and the added onboarding step increased time-to-first-play by 40 seconds on average. Killed in favor of keeping onboarding short; persona switching remains available post-onboarding.",
    series: buildSeries(
      WEEKS_8.slice(0, 4),
      [22.2, 22.6, 22.1, 22.4],
      [22.5, 22.8, 23.0, 22.9]
    ),
    owner: "Ravi Chandran",
  },
  {
    id: "exp-08",
    name: "Podcast video autoplay in feed",
    hypothesis:
      "If video episode previews autoplay muted as users scroll the Podcasts feed, discovery of video content will increase, especially on Android.",
    productArea: "podcasts",
    theme: "discovery",
    status: "running",
    primaryMetricName: "Video episode play rate",
    primaryMetricUnit: "%",
    controlValue: 11.8,
    treatmentValue: 15.9,
    liftPercent: 34.7,
    isSignificant: false,
    sampleSize: 275000,
    startDate: "2026-06-18",
    series: buildSeries(
      WEEKS_8.slice(0, 3),
      [11.6, 12.0, 11.8],
      [12.9, 14.5, 15.9]
    ),
    owner: "Lena Vogt",
  },
];

export function getExperimentById(id: string): Experiment | undefined {
  return experiments.find((e) => e.id === id);
}
