"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import type { SiteConfig } from "@/lib/config";
import type { Analytics } from "@/lib/analytics";
import { Card } from "../_ui";

type Status = {
  serverOnline: boolean;
  players: number | null;
  maxPlayers: number;
  rank: number | null;
  members: number | null;
  online: number | null;
};
type Health = { blob: boolean; sessionSecret: boolean; discordBot: boolean };

function daysBetween(from: Date, to: Date) {
  return Math.floor((to.getTime() - from.getTime()) / 86_400_000);
}
function lastDayKeys(n: number): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export default function Dashboard() {
  const [status, setStatus] = useState<Status | null>(null);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [health, setHealth] = useState<Health | null>(null);
  const [stats, setStats] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/status").then((r) => r.json()).then(setStatus).catch(() => {});
    fetch("/api/config").then((r) => r.json()).then(setConfig).catch(() => {});
    fetch("/api/admin/health").then((r) => r.json()).then(setHealth).catch(() => {});
    fetch("/api/admin/analytics").then((r) => r.json()).then(setStats).catch(() => {});
  }, []);

  const sinceWipe = config?.server.lastWipe
    ? Math.max(0, daysBetween(new Date(`${config.server.lastWipe}T00:00:00`), new Date()))
    : null;
  const untilWipe = config?.server.nextWipe
    ? daysBetween(new Date(), new Date(`${config.server.nextWipe}T00:00:00`))
    : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-bone">
          Resumen
        </h1>
        <p className="mt-1 text-sm text-smoke">Estado del servidor y la comunidad en vivo.</p>
      </div>

      {health && !health.blob && (
        <div className="border border-gold/40 bg-gold/10 p-4 text-sm text-gold">
          ⚠️ El almacenamiento (Vercel Blob) aún no está configurado. La subida de fotos y la
          analítica de visitas no funcionarán hasta crear un store de Blob y redeployar.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Servidor" value={status == null ? "…" : status.serverOnline ? "ONLINE" : "OFFLINE"} accent={status?.serverOnline ? "good" : "bad"} />
        <Stat label="Jugadores ahora" value={status?.players != null ? `${status.players}/${status.maxPlayers}` : `–/${status?.maxPlayers ?? site.server.slots}`} />
        <Stat label="Ranking BattleMetrics" value={status?.rank != null ? `#${status.rank}` : "—"} />
        <Stat label="Miembros Discord" value={status?.members != null ? status.members.toLocaleString("es-ES") : "—"} />
        <Stat label="Online en Discord" value={status?.online != null ? status.online.toLocaleString("es-ES") : "—"} />
        <Stat label="Días desde el wipe" value={sinceWipe != null ? String(sinceWipe) : "—"} />
        {untilWipe != null && (
          <Stat label="Próximo wipe" value={untilWipe <= 0 ? "¡HOY!" : `en ${untilWipe} d`} accent="fire" />
        )}
      </div>

      <VisitsCard stats={stats} />

      <Card title="Accesos rápidos">
        <div className="flex flex-wrap gap-3">
          <Quick href={`https://www.battlemetrics.com/servers/dayz/${site.server.battlemetricsId}`} label="BattleMetrics" />
          <Quick href={config?.social.discord || site.social.discord} label="Discord" />
          <Quick href={config?.social.youtube || site.social.youtube} label="YouTube" />
          <Quick href={config?.social.vote || site.social.vote} label="Votar (Top-Games)" />
        </div>
      </Card>
    </div>
  );
}

function VisitsCard({ stats }: { stats: Analytics | null }) {
  const keys = lastDayKeys(14);
  const counts = keys.map((k) => stats?.days[k] ?? 0);
  const max = Math.max(1, ...counts);
  const todayKey = keys[keys.length - 1];
  const today = stats?.days[todayKey] ?? 0;
  const last7 = keys.slice(-7).reduce((s, k) => s + (stats?.days[k] ?? 0), 0);
  const total = stats?.total ?? 0;
  const topPages = Object.entries(stats?.pages ?? {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <Card
      title="Visitas de la web"
      desc="Visitantes únicos por día (aproximado). Las analíticas detalladas están también en Vercel Analytics."
    >
      <div className="mb-6 grid grid-cols-3 gap-4">
        <Mini label="Hoy" value={today} />
        <Mini label="Últimos 7 días" value={last7} />
        <Mini label="Total" value={total} />
      </div>

      {/* Gráfica de barras (14 días) */}
      <div className="flex h-32 items-end gap-1.5">
        {counts.map((c, i) => (
          <div key={keys[i]} className="group relative flex flex-1 flex-col items-center justify-end">
            <div
              className="w-full bg-ember/70 transition-all group-hover:bg-ember"
              style={{ height: `${(c / max) * 100}%`, minHeight: c > 0 ? "3px" : "0" }}
              title={`${keys[i]}: ${c}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between font-stencil text-[0.55rem] uppercase tracking-wider text-ash-500">
        <span>hace 14 días</span>
        <span>hoy</span>
      </div>

      {topPages.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 font-stencil text-[0.6rem] uppercase tracking-[0.2em] text-smoke">
            Páginas de entrada más vistas
          </p>
          <div className="space-y-1.5">
            {topPages.map(([page, n]) => (
              <div key={page} className="flex items-center justify-between text-sm">
                <span className="truncate text-bone">{page}</span>
                <span className="ml-3 shrink-0 font-mono text-ember">{n}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {total === 0 && (
        <p className="mt-4 text-xs text-ash-400">
          Aún no hay visitas registradas (empezarán a contarse tras este despliegue).
        </p>
      )}
    </Card>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "good" | "bad" | "fire";
}) {
  const color =
    accent === "good"
      ? "text-emerald-400"
      : accent === "bad"
        ? "text-red-400"
        : accent === "fire"
          ? "text-fire"
          : "text-bone";
  return (
    <div className="flex min-h-[120px] flex-col items-center justify-center border border-ash-700 bg-ash-900/60 p-5 text-center">
      <p className="font-stencil text-[0.6rem] uppercase tracking-[0.2em] text-smoke">{label}</p>
      <p className={`mt-2 font-display text-3xl font-extrabold uppercase ${color}`}>{value}</p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-ash-700 bg-ash-950 p-4 text-center">
      <p className="font-stencil text-[0.55rem] uppercase tracking-[0.2em] text-smoke">{label}</p>
      <p className="mt-1 font-display text-2xl font-extrabold text-bone">
        {value.toLocaleString("es-ES")}
      </p>
    </div>
  );
}

function Quick({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 items-center gap-2 border border-ash-600 bg-ash-800/60 px-4 text-sm text-bone transition hover:border-ember/70 hover:text-ember"
    >
      ↗ {label}
    </a>
  );
}
