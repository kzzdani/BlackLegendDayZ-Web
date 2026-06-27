import { NextResponse } from "next/server";
import { getSiteConfigFresh, type GalleryImage } from "@/lib/config";
import { saveSiteConfig, uploadGalleryImage, deleteBlobByUrl } from "@/lib/admin-store";

export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const OK_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

/** Subir una foto nueva a la galería. */
export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Almacenamiento no configurado: crea un store de Vercel Blob y vuelve a desplegar." },
      { status: 503 },
    );
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const caption = (form?.get("caption") as string) || "";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió ninguna imagen." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "La imagen supera los 8 MB." }, { status: 400 });
  }
  if (file.type && !OK_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Formato no válido (usa JPG, PNG, WebP o GIF)." }, { status: 400 });
  }

  const url = await uploadGalleryImage(file, file.name || "foto.jpg");

  const config = await getSiteConfigFresh();
  const next: GalleryImage = { url, caption: caption.slice(0, 120), featured: false };
  const saved = await saveSiteConfig({ ...config, gallery: [...config.gallery, next] });
  return NextResponse.json({ ok: true, gallery: saved.gallery });
}

/** Borrar una foto de la galería (y del almacenamiento). */
export async function DELETE(req: Request) {
  const { url } = (await req.json().catch(() => ({}))) as { url?: string };
  if (!url) return NextResponse.json({ error: "Falta la URL." }, { status: 400 });

  const config = await getSiteConfigFresh();
  const gallery = config.gallery.filter((g) => g.url !== url);
  const saved = await saveSiteConfig({ ...config, gallery });
  await deleteBlobByUrl(url);
  return NextResponse.json({ ok: true, gallery: saved.gallery });
}
