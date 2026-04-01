import Link from "next/link";

export const authStyles = {
  input:
    "bg-surface rounded-xl px-3 py-4 w-full text-white text-sm focus:outline-none",
  button:
    "w-full bg-purple-400 text-black font-semibold py-4 rounded-lg hover:opacity-90 transition duration-400 cursor-pointer",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-6 space-y-6">
        <p className="text-6xl text-purple-500 text-center">
          No.<span className="text-7xl text-purple-400 text-center"> Fil</span>
        </p>
        <h1 className="text-2xl font-semibold text-white text-center">
          Se connecter
        </h1>
        <form className="space-y-4">
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
          <button className={authStyles.button}>Se connecter</button>
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
