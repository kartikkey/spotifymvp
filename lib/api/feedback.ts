import { feedback as data, FEEDBACK_VOLUME_SERIES } from "@/lib/data/feedback";
import type { FeedbackItem, TrendPoint } from "@/lib/types";

export async function getFeedback(): Promise<FeedbackItem[]> {
  return [...data].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getFeedbackVolumeSeries(): Promise<TrendPoint[]> {
  return FEEDBACK_VOLUME_SERIES;
}

export async function getFeedbackByIds(ids: string[]): Promise<FeedbackItem[]> {
  const set = new Set(ids);
  return data.filter((f) => set.has(f.id));
}
