import Container from "@/components/layouts/Container";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import ProfileModal from "@/components/modal/ProfileModal";
import ProfileCard from "@/components/profile/ProfileCard";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { getCurrentUserProfile } from "@/server-actions/getCurrentUserProfile";
import { Suspense } from "react";

async function ProfileComponent() {
  const userProfile = await getCurrentUserProfile();
  const currentUser = await getCurrentUser();

  return (
    <>
      {userProfile && <ProfileCard userProfile={userProfile} currentUserId={currentUser?.id || ""} />}
      {userProfile && <ProfileModal userProfile={userProfile} />}
    </>
  );
}

export default async function ProfilePage() {
  return (
    <Container title="Profil">
      <Suspense fallback={ <LoadingSpinner />}>
        <ProfileComponent />
      </Suspense>
    </Container>
  );
}
