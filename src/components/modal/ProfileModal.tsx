"use client";
import { useModalStore } from "@/store/useModalStore";
import Modal from "./Modal";
import { useState } from "react";
import Image from "next/image";
import { User } from "@/types/user";
import toast from "react-hot-toast";
import axios from "axios";
import { set } from "better-auth";
import { useRouter } from "next/navigation";

interface ProfileModalProps {
  userProfile: User;
}

export default function ProfileModal({ userProfile }: ProfileModalProps) {
  const { closeEditProfile, isEditProfileOpen } = useModalStore();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(userProfile.image);
  const [name, setName] = useState(userProfile.name);
  const [username, setUsername] = useState(userProfile.username);
  const [bio, setBio] = useState(userProfile.bio);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);

    const previewURL = URL.createObjectURL(file);
    setAvatarPreview(previewURL);
  };

  const handleSubmit = async () => {
    if (!username || !name) {
      toast.error("Le nom et le nom d'utilisateur sont requis !");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name || "");
      formData.append("username", username || "");
      formData.append("bio", bio || "");
      if (avatarFile) {
        formData.append("image", avatarFile);
      }

      await axios.patch("/api/profile/update", formData);

      router.refresh();

      closeEditProfile();

      toast.success("Profil mis à jour avec succès !");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        toast.error(
          error?.response?.data?.error ||
            "Une erreur est survenue lors de la mise à jour du profil",
        );
      }
    } finally {
      setLoading(false);
    }
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
            value={name || ""}
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
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-text-muted">Description</label>
          <textarea
            placeholder="Votre description"
            className={`resize-none ${inputStyles}`}
            value={bio || ""}
            rows={4}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition cursor-pointer"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
