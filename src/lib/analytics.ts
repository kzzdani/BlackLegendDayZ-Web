// =============================================================================
// Analítica de visitas LIGERA y propia (para que Jaro la vea en el panel sin
// necesidad de acceso a Vercel). Se guarda en Blob (`config/analytics.json`).
//
// Para no disparar las operaciones de Blob del plan gratuito, contamos 1 visita
// por visitante y día (la ruta /api/track usa una cookie diaria como candado).
// Es una métrica aproximada de "visitantes únicos por día".
// =============================================================================

import "server-only";
import { list, put } from "@vercel/blob";

const PATH = "config/analytics.json";

export type Analytics = {
  total: number;
  days: Record<string, number>; // "YYYY-MM-DD" -> visitas
  pages: Record<string, number>; // ruta de entrada -> visitas
  updatedAt: string;
};

function empty(): Analytics {
  return { total: 0, days: {}, pages: {}, updatedAt: "" };
}

async function read(): Promise<Analytics> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return empty();
  try {
    const { blobs } = await list({ prefix: PATH, limit: 1 });
    const blob = blobs.find((b) => b.pathname === PATH);
    if (!blob) return empty();
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return empty();
    return { ...empty(), ...((await res.json()) as Partial<Analytics>) };
  } catch {
    return empty();
  }
}

/** Registra una visita (ruta de entrada). Best-effort. */
export async function recordVisit(path: string): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  const a = await read();
  const day = new Date().toISOString().slice(0, 10);
  const p = (path || "/").split("?")[0].slice(0, 80) || "/";

  a.total += 1;
  a.days[day] = (a.days[day] || 0) + 1;
  a.pages[p] = (a.pages[p] || 0) + 1;

  // Conservamos como mucho 90 días de historial.
  const keys = Object.keys(a.days).sort();
  while (keys.length > 90) delete a.days[keys.shift()!];
  a.updatedAt = new Date().toISOString();

  await put(PATH, JSON.stringify(a), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

export async function getAnalytics(): Promise<Analytics> {
  return read();
}
