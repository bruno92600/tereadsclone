"use client";
import Link from "next/link";
import { authStyles } from "../login/page";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface RegisterValues {
  email: string;
  name: string;
  password: string;
}

export default function RegisterPage() {
  const [values, setValues] = useState<RegisterValues>({
    email: "",
    name: "",
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

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!values.email || !values.name || !values.password) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error(error.message as string);
        return;
      }

      toast.success("Inscription réussie !");
      setValues({
        email: "",
        name: "",
        password: "",
      });
      router.replace("/setup-username");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
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
          S&apos;inscrire
        </h1>
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Votre nom"
            className={authStyles.input}
            name="name"
            value={values.name}
            onChange={handleChange}
          />
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
          <button disabled={loading} className={authStyles.button}>
            {loading ? "Inscription en cours..." : "S'inscrire"}
          </button>
        </form>
        <p className="text-center text-sm text-text-muted">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-purple-400 hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </main>
  );
}
