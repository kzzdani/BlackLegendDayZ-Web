"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Resumen", exact: true },
  { href: "/admin/galeria", label: "Galería" },
  { href: "/admin/ajustes", label: "Ajustes" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-ash-800 bg-ash-950 p-5 md:flex">
        <div className="mb-8">
          <p className="font-stencil text-[0.55rem] uppercase tracking-[0.3em] text-ember">
            Black Legend
          </p>
          <p className="font-display text-lg font-bold uppercase text-bone">Panel admin</p>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-l-2 px-3 py-2 font-display text-sm font-bold uppercase tracking-wide transition",
                  active
                    ? "border-ember bg-ash-800/60 text-ember"
                    : "border-transparent text-smoke hover:border-ash-600 hover:text-bone",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto space-y-3 pt-6">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-ash-400 hover:text-ember"
          >
            ↗ Ver la web
          </a>
          <button
            onClick={logout}
            className="text-xs font-bold uppercase tracking-widest text-smoke hover:text-red-400"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Top bar (móvil) */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-ash-800 bg-ash-950 px-5 py-3 md:hidden">
          <p className="font-display font-bold uppercase text-bone">Panel admin</p>
          <button onClick={logout} className="text-xs uppercase tracking-widest text-smoke">
            Salir
          </button>
        </header>
        <nav className="flex gap-1 border-b border-ash-800 bg-ash-950 px-3 py-2 md:hidden">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wide",
                  active ? "text-ember" : "text-smoke",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="mx-auto w-full max-w-5xl flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
