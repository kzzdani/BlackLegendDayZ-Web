// =============================================================================
// Capa de configuración DINÁMICA (panel de admin)
// -----------------------------------------------------------------------------
// La web es estática por defecto (datos en site.ts). Esta capa permite que Jaro
// edite ciertos datos desde /admin sin tocar código. Los overrides se guardan en
// un único JSON en Vercel Blob (`config/site-config.json`).
//
// DEGRADACIÓN ELEGANTE: si Vercel Blob no está configurado (sin
// BLOB_READ_WRITE_TOKEN), todo cae a los valores por defecto de site.ts y la web
// sigue funcionando exactamente igual que antes.
// =============================================================================

import { list } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { site, mods as defaultMods } from "@/lib/site";

export const CONFIG_PATH = "config/site-config.json";
export const CONFIG_TAG = "site-config";

export type BannerVariant = "info" | "warning" | "event";

export type Banner = {
  enabled: boolean;
  text: string; // español
  textEn: string; // inglés (opcional; si vacío usa `text`)
  variant: BannerVariant;
  link: string; // URL opcional (si está, el banner es clicable)
};

export type GalleryImage = {
  url: string; // URL pública (Blob) o ruta estática (/gallery/..)
  caption: string;
  featured?: boolean; // ocupa 2x2 en el grid
};

export type ClipsControl = {
  featuredId: string; // ID de vídeo de YouTube destacado (vacío = autoselección)
  hiddenIds: string[]; // IDs ocultados de la cuadrícula
};

export type ServerCfg = {
  ip: string;
  port: string;
  slots: string;
  currentMap: string;
  lastWipe: string; // YYYY-MM-DD
  nextWipe: string; // YYYY-MM-DD (vacío = sin cuenta atrás)
};

export type SocialCfg = {
  discord: string;
  youtube: string;
  vote: string;
};

export type SiteConfig = {
  server: ServerCfg;
  social: SocialCfg;
  mods: string[];
  banner: Banner;
  gallery: GalleryImage[];
  clips: ClipsControl;
  updatedAt: string;
};

/** Valores por defecto, derivados de la config estática (site.ts). */
export function defaultConfig(): SiteConfig {
  return {
    server: {
      ip: site.server.ip,
      port: site.server.port,
      slots: site.server.slots,
      currentMap: site.server.currentMap,
      lastWipe: site.server.lastWipe,
      nextWipe: "",
    },
    social: {
      discord: site.social.discord,
      youtube: site.social.youtube,
      vote: site.social.vote,
    },
    mods: [...defaultMods],
    banner: { enabled: false, text: "", textEn: "", variant: "info", link: "" },
    gallery: [],
    clips: { featuredId: "", hiddenIds: [] },
    updatedAt: "",
  };
}

/** Mezcla los overrides guardados sobre los valores por defecto. */
export function mergeConfig(saved: Partial<SiteConfig> | null | undefined): SiteConfig {
  const d = defaultConfig();
  if (!saved) return d;
  return {
    server: { ...d.server, ...(saved.server ?? {}) },
    social: { ...d.social, ...(saved.social ?? {}) },
    mods: Array.isArray(saved.mods) && saved.mods.length ? saved.mods : d.mods,
    banner: { ...d.banner, ...(saved.banner ?? {}) },
    gallery: Array.isArray(saved.gallery) ? saved.gallery : d.gallery,
    clips: { ...d.clips, ...(saved.clips ?? {}) },
    updatedAt: saved.updatedAt ?? "",
  };
}

const hasBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;

/** Lee el JSON crudo de overrides desde Blob (o null si no hay nada/no configurado). */
async function readConfigBlob(): Promise<Partial<SiteConfig> | null> {
  if (!hasBlob()) return null;
  try {
    const { blobs } = await list({ prefix: CONFIG_PATH, limit: 1 });
    const blob = blobs.find((b) => b.pathname === CONFIG_PATH);
    if (!blob) return null;
    const res = await fetch(blob.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Partial<SiteConfig>;
  } catch {
    return null;
  }
}

/**
 * Config pública mergeada y CACHEADA (revalida cada 60s; se invalida al guardar
 * desde el admin con revalidateTag(CONFIG_TAG)). Úsala en componentes de servidor
 * y en /api/config.
 */
export const getSiteConfig = unstable_cache(
  async (): Promise<SiteConfig> => mergeConfig(await readConfigBlob()),
  ["site-config"],
  { tags: [CONFIG_TAG], revalidate: 60 },
);

/** Lectura SIN caché (para el panel de admin, que necesita el estado real). */
export async function getSiteConfigFresh(): Promise<SiteConfig> {
  return mergeConfig(await readConfigBlob());
}
