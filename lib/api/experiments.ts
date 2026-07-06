import { experiments as data, getExperimentById as findById } from "@/lib/data/experiments";
import type { Experiment } from "@/lib/types";

export async function getExperiments(): Promise<Experiment[]> {
  return data;
}

export async function getExperimentById(id: string): Promise<Experiment | undefined> {
  return findById(id);
}
