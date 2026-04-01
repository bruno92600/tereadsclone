import { authStyles } from "../(auth)/login/page";

export default function SetupUsernamePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-6 space-y-6">
        <p className="text-6xl text-purple-500 text-center">
          No.<span className="text-7xl text-purple-400 text-center"> Fil</span>
        </p>
        <h1 className="text-2xl font-semibold text-white text-center">
          Configurer votre nom d&apos;utilisateur
        </h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Votre nom d'utilisateur"
            className={authStyles.input}
          />
          <button className={authStyles.button}>Configurer</button>
        </form>
      </div>
    </main>
  );
}
