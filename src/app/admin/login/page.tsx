"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Field, Input } from "../_ui";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "No se pudo iniciar sesión.");
      }
    } catch {
      setError("Error de red.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-stencil text-[0.6rem] uppercase tracking-[0.35em] text-ember">
            Black Legend DayZ
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-bone">
            Panel de <span className="text-fire">admin</span>
          </h1>
        </div>
        <Card>
          <form onSubmit={submit} className="space-y-5">
            <Field label="Contraseña">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                placeholder="••••••••"
              />
            </Field>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" disabled={loading || !password} className="w-full">
              {loading ? "Entrando…" : "Entrar"}
            </Button>
          </form>
        </Card>
        <p className="mt-6 text-center text-xs text-ash-500">
          Acceso solo para administradores.
        </p>
      </div>
    </main>
  );
}
