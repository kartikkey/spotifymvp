import { getOpportunities } from "@/lib/api";
import { PageHeader } from "@/components/layout/page-header";
import { OpportunitiesBoard } from "@/components/opportunities/opportunities-board";

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <>
      <PageHeader
        eyebrow="Prioritization"
        title="Opportunities"
        description="Ranked by RICE score. Every opportunity here traces back to an insight, an experiment, or direct user feedback."
      />
      <OpportunitiesBoard opportunities={opportunities} />
    </>
  );
}
