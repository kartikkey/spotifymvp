import { getFeedback, getFeedbackVolumeSeries } from "@/lib/api";
import { PageHeader } from "@/components/layout/page-header";
import { FeedbackBoard } from "@/components/feedback/feedback-board";

export default async function FeedbackPage() {
  const [feedback, volumeSeries] = await Promise.all([
    getFeedback(),
    getFeedbackVolumeSeries(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Voice of Customer"
        title="Feedback"
        description="App Store, Google Play, Reddit, and support tickets, aggregated and tagged by theme and sentiment."
      />
      <FeedbackBoard feedback={feedback} volumeSeries={volumeSeries} />
    </>
  );
}
