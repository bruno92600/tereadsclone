import MobileMenu from "@/components/general/MobileMenu";
import Sidebar from "@/components/general/Sidebar";
import ProfileModal from "@/components/modal/ProfileModal";
import { requireAuth } from "@/server-actions/requireAuth";

export default async function ProtectedRoute({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAuth();

  return <div className="mt-15">
    {children}
    <Sidebar />
    <MobileMenu />
    <ProfileModal />
  </div>;
}
