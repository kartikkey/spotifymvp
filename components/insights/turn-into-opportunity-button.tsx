"use client";

import Link from "next/link";
import { toast } from "sonner";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface TurnIntoOpportunityButtonProps {
  headline: string;
  convertedToOpportunity: boolean;
  relatedOpportunityId?: string;
}

export function TurnIntoOpportunityButton({
  headline,
  convertedToOpportunity,
  relatedOpportunityId,
}: TurnIntoOpportunityButtonProps) {
  if (convertedToOpportunity && relatedOpportunityId) {
    return (
      <Link
        href={`/opportunities/${relatedOpportunityId}`}
        className="flex items-center gap-1 text-xs font-semibold text-brand-green hover:underline"
      >
        View opportunity
        <ArrowUpRight className="size-3" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        toast.success("Opportunity drafted", {
          description: `"${headline}" was added to the Opportunities backlog for review.`,
        })
      }
      className="flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-brand-green"
    >
      <Sparkles className="size-3" />
      Turn into Opportunity
    </button>
  );
}
