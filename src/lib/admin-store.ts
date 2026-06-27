// =============================================================================
// Escrituras del panel de admin (server-only): guardar config y gestionar fotos.
// =============================================================================

import "server-only";
import { put, del } from "@vercel/blob";
import { revalidateTag } from "next/cache";
import { CONFIG_PATH, CONFIG_TAG, type SiteConfig } from "@/lib/config";

/** Guarda la config completa en Blob e invalida la caché pública al instante. */
export async function saveSiteConfig(next: SiteConfig): Promise<SiteConfig> {
  const payload: SiteConfig = { ...next, updatedAt: new Date().toISOString() };
  await put(CONFIG_PATH, JSON.stringify(payload, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
  revalidateTag(CONFIG_TAG, "max");
  return payload;
}

/** Sube una imagen a Blob bajo gallery/ y devuelve su URL pública. */
export async function uploadGalleryImage(
  file: File | Blob,
  filename: string,
): Promise<string> {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-60) || "foto.jpg";
  const blob = await put(`gallery/${Date.now()}-${safe}`, file, {
    access: "public",
    addRandomSuffix: true,
  });
  return blob.url;
}

/** Borra un blob por URL (solo si pertenece a nuestro store de Blob). */
export async function deleteBlobByUrl(url: string): Promise<void> {
  if (!url.includes(".blob.vercel-storage.com")) return; // no borrar estáticos
  try {
    await del(url);
  } catch {
    /* si ya no existe, da igual */
  }
}
