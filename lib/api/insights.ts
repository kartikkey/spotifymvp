import { insights as data, getInsightById as findById } from "@/lib/data/insights";
import type { Insight } from "@/lib/types";

export async function getInsights(): Promise<Insight[]> {
  return [...data].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getInsightById(id: string): Promise<Insight | undefined> {
  return findById(id);
}

export async function getLatestInsights(limit = 3): Promise<Insight[]> {
  const sorted = await getInsights();
  return sorted.slice(0, limit);
}

export async function getInsightsByIds(ids: string[]): Promise<Insight[]> {
  const set = new Set(ids);
  return data.filter((i) => set.has(i.id));
}
