"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import type { SiteConfig } from "@/lib/config";
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

export default function Dashboard() {
  const [status, setStatus] = useState<Status | null>(null);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    fetch("/api/status").then((r) => r.json()).then(setStatus).catch(() => {});
    fetch("/api/config").then((r) => r.json()).then(setConfig).catch(() => {});
    fetch("/api/admin/health").then((r) => r.json()).then(setHealth).catch(() => {});
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
          ⚠️ El almacenamiento de fotos (Vercel Blob) aún no está configurado. La subida de
          imágenes a la galería no funcionará hasta que crees un store de Blob en Vercel y
          vuelvas a desplegar.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat
          label="Servidor"
          value={
            status == null
              ? "…"
              : status.serverOnline
                ? "ONLINE"
                : "OFFLINE"
          }
          accent={status?.serverOnline ? "good" : "bad"}
        />
        <Stat
          label="Jugadores ahora"
          value={
            status?.players != null
              ? `${status.players}/${status.maxPlayers}`
              : `–/${status?.maxPlayers ?? site.server.slots}`
          }
        />
        <Stat
          label="Ranking BattleMetrics"
          value={status?.rank != null ? `#${status.rank}` : "—"}
        />
        <Stat
          label="Miembros Discord"
          value={status?.members != null ? status.members.toLocaleString("es-ES") : "—"}
        />
        <Stat
          label="Online en Discord"
          value={status?.online != null ? status.online.toLocaleString("es-ES") : "—"}
        />
        <Stat
          label="Días desde el wipe"
          value={sinceWipe != null ? String(sinceWipe) : "—"}
        />
        {untilWipe != null && (
          <Stat
            label="Próximo wipe"
            value={untilWipe <= 0 ? "¡HOY!" : `en ${untilWipe} d`}
            accent="fire"
          />
        )}
      </div>

      <Card title="Visitas de la web" desc="Las analíticas reales (visitas, páginas más vistas, de dónde llega la gente) se ven en Vercel Analytics.">
        <a
          href="https://vercel.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-2 border border-ash-500 bg-ash-800/70 px-4 font-display text-sm font-bold uppercase tracking-widest text-bone hover:border-ember/70"
        >
          ↗ Abrir Vercel Analytics
        </a>
        <p className="mt-3 text-xs text-ash-400">
          (En Vercel → tu proyecto → pestaña <strong>Analytics</strong>. Ya está activado en la web.)
        </p>
      </Card>

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
    <div className="border border-ash-700 bg-ash-900/60 p-5">
      <p className="font-stencil text-[0.6rem] uppercase tracking-[0.2em] text-smoke">{label}</p>
      <p className={`mt-2 font-display text-3xl font-extrabold uppercase ${color}`}>{value}</p>
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
