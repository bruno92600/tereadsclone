"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const authStyles = {
  input:
    "bg-surface rounded-xl px-3 py-4 w-full text-white text-sm focus:outline-none",
  button:
    "w-full bg-purple-400 text-black font-semibold py-4 rounded-lg hover:opacity-90 transition duration-400 cursor-pointer",
};

interface RegisterValues {
  email: string;
  password: string;
}

export default function LoginPage() {

  const [values, setValues] = useState<RegisterValues>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!values.email || !values.password) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message as string);
        return;
      }

      toast.success("Connexion réussie !");
      setValues({
        email: "",
        password: "",
      });
      router.replace("/feed");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la connexion. Veuillez réessayer.",
      );
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
          Se connecter
        </h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Votre mail"
            className={authStyles.input}
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Votre mot de passe"
            className={authStyles.input}
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button className={authStyles.button} disabled={loading}>
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
        <p className="text-center text-sm text-text-muted">
          Pas de compte ?{" "}
          <Link href="/register" className="text-purple-400 hover:underline">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </main>
  );
}
