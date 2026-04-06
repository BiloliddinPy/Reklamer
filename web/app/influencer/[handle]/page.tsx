import { PublicProfile } from "@/features/profile/components/PublicProfile";

export default async function InfluencerPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  return <PublicProfile handle={handle} />;
}
