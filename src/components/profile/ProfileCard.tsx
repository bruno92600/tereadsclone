"use client";
import { useModalStore } from "@/store/useModalStore";
import Avatar from "../ui/Avatar";
import { User } from "@/types/user";

interface ProfileCardProps {
  userProfile: User;
}

export default function ProfileCard({ userProfile }: ProfileCardProps) {
  const { openEditProfile } = useModalStore();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="">
          <p className="text-xl text-white font-semibold">
            {userProfile.name || "Nom d'utilisateur"}
          </p>
          <p className="text-sm text-white/70 mt-1">
            @{userProfile.username || "nom_utilisateur"}
          </p>
        </div>
        <Avatar
          imgSrc={userProfile.image || "/images/avatar.png"}
          alt={userProfile.name || "Avatar de l'utilisateur"}
          width={80}
          height={80}
        />
      </div>
      <div className="flex gap-2 items-center text-sm text-purple-500 my-4">
        <p>{userProfile._count.followers} abonnés</p>
        <p>{userProfile._count.following} abonnements</p>
        <p>{userProfile._count.posts} publications</p>
      </div>

      {userProfile.bio ? (
        <p className="text-sm text-white/80 my-6">{userProfile.bio}</p>
      ) : (
        <p
          className="text-sm text-purple-400 my-4 cursor-pointer"
          onClick={openEditProfile}
        >
          Ajouter une description
        </p>
      )}
      <button
        onClick={openEditProfile}
        className="w-full py-1 border border-border text-white/90 rounded-lg cursor-pointer"
      >
        Modifier le profil
      </button>
    </>
  );
}
