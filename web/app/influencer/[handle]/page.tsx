import { getAllInfluencers } from "@/domain/influencer/selectors";
import { PublicProfile } from "@/features/profile/components/PublicProfile";

export function generateStaticParams() {
  return getAllInfluencers().map((influencer) => ({
    handle: influencer.handle,
  }));
}

export default async function InfluencerPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  return <PublicProfile handle={handle} />;
}
