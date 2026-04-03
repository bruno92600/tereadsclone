"use client";
import { useModalStore } from "@/store/useModalStore";
import Avatar from "../ui/Avatar";

export default function ProfileCard() {

  const { openEditProfile } = useModalStore();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="">
          <p className="text-xl text-white font-semibold">Nom</p>
          <p className="text-sm text-white/70 mt-1">@nom d&apos;utilisateur</p>
        </div>
        <Avatar
          imgSrc="/images/IMG_1442 (1)-2.jpg"
          alt="photo de profil"
          width={80}
          height={80}
        />

        
      </div>
      <div className="flex gap-2 items-center text-sm text-purple-500 my-4">
            <p className="">23 abonnés</p>
            <p className="">23 abonnements</p>
            <p className="">23 publications</p>
        </div>

        <button onClick={openEditProfile} className="w-full py-1 border border-border text-white/90 rounded-lg cursor-pointer">
            Modifier le profil
        </button>
    </>
  );
}
