import Link from "next/link";
import { authStyles } from "../login/page";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-6 space-y-6">
        <p className="text-6xl text-purple-500 text-center">
          No.<span className="text-7xl text-purple-400 text-center"> Fil</span>
        </p>
        <h1 className="text-2xl font-semibold text-white text-center">
          S&apos;inscrire
        </h1>
        <form className="space-y-4">
            <input
            type="text"
            placeholder="Votre nom"
            className={authStyles.input}
          />
          <input
            type="email"
            placeholder="Votre mail"
            className={authStyles.input}
          />
          <input
            type="text"
            placeholder="Votre mot de passe"
            className={authStyles.input}
          />
          <button className={authStyles.button}>S&apos;inscrire</button>
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
