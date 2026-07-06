import { getExperiments } from "@/lib/api";
import { PageHeader } from "@/components/layout/page-header";
import { ExperimentsBoard } from "@/components/experiments/experiments-board";

export default async function ExperimentsPage() {
  const experiments = await getExperiments();

  return (
    <>
      <PageHeader
        eyebrow="A/B Testing"
        title="Experiments"
        description="Every test running or shipped this quarter, with the primary metric movement and significance."
      />
      <ExperimentsBoard experiments={experiments} />
    </>
  );
}
