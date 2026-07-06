import { getInsights } from "@/lib/api";
import { PageHeader } from "@/components/layout/page-header";
import { InsightsFeed } from "@/components/insights/insights-feed";

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <>
      <PageHeader
        eyebrow="AI-Generated"
        title="Insights"
        description="Synthesized findings from retention cohorts, experiments, and feedback — surfaced automatically, ranked by recency."
      />
      <InsightsFeed insights={insights} />
    </>
  );
}
