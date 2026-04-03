"use client";
import { useModalStore } from "@/store/useModalStore";
import Modal from "./Modal";
import { useState } from "react";
import Image from "next/image";

export default function ProfileModal() {
  const { closeEditProfile, isEditProfileOpen } = useModalStore();

  const [avatarPreview, setAvatarPreview] = useState(
    "/images/IMG_1442 (1)-2.jpg",
  );
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setAvatarPreview(previewURL);
  };

  const inputStyles =
    "bg-surface border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500";

  return (
    <Modal
      title="Modifier le profil"
      onClose={closeEditProfile}
      isOpen={isEditProfileOpen}
    >
      <div className="mt-4 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={avatarPreview || "/images/avatar.png"}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>

          <label className="text-sm text-purple-500 cursor-pointer hover:text-white hover:underline transition">
            Changer de photo
            <input
              className="hidden"
              type="file"
              accept="images/*"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-muted">Nom</label>
          <input
            type="text"
            placeholder="Votre nom"
            className={inputStyles}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-muted">
            Nom d&apos;utilisateur
          </label>
          <input
            type="text"
            placeholder="Votre nom d'utilisateur"
            className={inputStyles}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-muted">Description</label>
          <textarea
            placeholder="Votre description"
            className={`resize-none ${inputStyles}`}
            value={bio}
            rows={4}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition cursor-pointer">
            Enregistrer
          </button>
        </div>
      </div>
    </Modal>
  );
}
