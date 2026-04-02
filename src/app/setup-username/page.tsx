"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const authStyles = {
  input:
    "bg-surface rounded-xl px-3 py-4 w-full text-white text-sm focus:outline-none",
  button:
    "w-full bg-purple-400 text-black font-semibold py-4 rounded-lg hover:opacity-90 transition duration-400 cursor-pointer",
};

export default function SetupUsernamePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Nom d'utilisateur requis !");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/auth/setup-username", { username });
      toast.success("Nom d'utilisateur configuré avec succès !");
      router.replace("/feed");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Une erreur est survenue");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-6 space-y-6">
        <p className="text-6xl text-purple-500 text-center">
          No.<span className="text-7xl text-purple-400 text-center"> Fil</span>
        </p>
        <h1 className="text-2xl font-semibold text-white text-center">
          Configurer votre nom d&apos;utilisateur
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Votre nom d'utilisateur"
            className={authStyles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button disabled={loading} className={authStyles.button}>
            {loading ? "Configuration en cours..." : "Configurer"}
          </button>
        </form>
      </div>
    </main>
  );
}
