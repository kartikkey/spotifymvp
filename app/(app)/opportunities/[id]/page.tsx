import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getFeedbackByIds, getInsightsByIds, getOpportunityById } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { ThemeTag } from "@/components/shared/theme-tag";
import { ProductAreaTag } from "@/components/shared/product-area-tag";
import { OpportunityStatusPill } from "@/components/shared/status-pill";
import { InsightCard } from "@/components/shared/insight-card";
import { FeedbackQuoteCard } from "@/components/shared/feedback-quote-card";
import { SectionHeader } from "@/components/shared/section-header";
import { RiceBreakdown } from "@/components/opportunities/rice-breakdown";
import { ActivityTimeline } from "@/components/opportunities/activity-timeline";

export default async function OpportunityDetailPage(props: PageProps<"/opportunities/[id]">) {
  const [{ id }] = await Promise.all([props.params, props.searchParams]);
  const opportunity = await getOpportunityById(id);
  if (!opportunity) notFound();

  const [linkedInsights, linkedFeedback] = await Promise.all([
    getInsightsByIds(opportunity.linkedInsightIds),
    getFeedbackByIds(opportunity.linkedFeedbackIds),
  ]);

  return (
    <>
      <Link
        href="/opportunities"
        className="flex w-fit items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Opportunities
      </Link>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <OpportunityStatusPill status={opportunity.status} />
          <ThemeTag theme={opportunity.theme} />
          <ProductAreaTag productArea={opportunity.productArea} />
        </div>
        <h1 className="max-w-3xl text-2xl font-bold tracking-tight text-text-primary sm:text-[28px]">
          {opportunity.title}
        </h1>
        <p className="max-w-3xl text-sm text-text-secondary">{opportunity.summary}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-tertiary">
          <span>
            Owner <span className="text-text-secondary">{opportunity.owner}</span>
          </span>
          <span>Created {formatDate(opportunity.createdAt)}</span>
          <span>Updated {formatDate(opportunity.updatedAt)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-8">
          <section>
            <SectionHeader title="Write-up" />
            <p className="max-w-2xl whitespace-pre-line text-sm leading-relaxed text-text-secondary">
              {opportunity.description}
            </p>
          </section>

          {linkedInsights.length > 0 && (
            <section>
              <SectionHeader title="Linked Insights" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {linkedInsights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </section>
          )}

          {linkedFeedback.length > 0 && (
            <section>
              <SectionHeader title="Linked Feedback" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {linkedFeedback.map((item) => (
                  <FeedbackQuoteCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <RiceBreakdown rice={opportunity.rice} score={opportunity.riceScore} />
          <section>
            <SectionHeader title="Activity" />
            <ActivityTimeline activity={opportunity.activity} />
          </section>
        </div>
      </div>
    </>
  );
}
