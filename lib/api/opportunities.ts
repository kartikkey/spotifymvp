import { opportunities as data, getOpportunityById as findById } from "@/lib/data/opportunities";
import type { Opportunity } from "@/lib/types";

/**
 * Thin async service layer over the mock fixtures. Every page reads through
 * these functions rather than importing lib/data directly, so swapping in a
 * real API later is a change contained to this file.
 */
export async function getOpportunities(): Promise<Opportunity[]> {
  return data;
}

export async function getOpportunityById(id: string): Promise<Opportunity | undefined> {
  return findById(id);
}

export async function getTopOpportunities(limit = 3): Promise<Opportunity[]> {
  return [...data].sort((a, b) => b.riceScore - a.riceScore).slice(0, limit);
}
