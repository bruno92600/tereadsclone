import Container from "@/components/layouts/Container";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import ProfileCard from "@/components/profile/ProfileCard";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { getUserProfileByUsername } from "@/server-actions/getUserProfileByUsername";
import { Suspense } from "react";

async function ProfileLoader({ username }: { username: string }) {
  const user = await getUserProfileByUsername(username);
  const currentUser = await getCurrentUser();

  if (!user || user instanceof Error) return <div className="text-white">Aucun</div>;
  return <ProfileCard userProfile={user} currentUserId={currentUser?.id || ""} />;
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;

  return (
    <Container title={username} showBackButton>
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileLoader username={username} />
      </Suspense>
    </Container>
  );
}
