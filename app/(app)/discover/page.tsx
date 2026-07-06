import { getDiscoveryProfile, getRecentlyPlayed, getSuggestedPrompts } from "@/lib/api";
import { DiscoverExperience } from "@/components/discover/discover-experience";

export default async function DiscoverPage() {
  const [profile, recentlyPlayed, suggestedPrompts] = await Promise.all([
    getDiscoveryProfile(),
    getRecentlyPlayed(),
    getSuggestedPrompts(),
  ]);

  return (
    <DiscoverExperience
      initialProfile={profile}
      recentlyPlayed={recentlyPlayed}
      suggestedPrompts={suggestedPrompts}
    />
  );
}
