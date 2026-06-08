import { useState } from "react";
import { useAuth } from "./AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const ok = await login(email, password);
    setLoading(false);

    if (!ok) setError("Correo o contraseña incorrectos");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 text-center text-gray-800 dark:text-gray-100"
    >
      <h2 className="text-2xl font-bold mb-2">Iniciar sesión</h2>

      <div className="space-y-3">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-zinc-800"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 dark:bg-zinc-800"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-full rounded-lg font-semibold transition-all duration-200"
      >
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}
