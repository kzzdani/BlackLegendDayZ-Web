import { NextResponse } from "next/server";
import {
  getSiteConfigFresh,
  mergeConfig,
  type BannerVariant,
  type GalleryImage,
  type SiteConfig,
} from "@/lib/config";
import { saveSiteConfig } from "@/lib/admin-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getSiteConfigFresh());
}

const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
const variants: BannerVariant[] = ["info", "warning", "event"];

/** Construye una SiteConfig saneada a partir del body recibido del panel. */
function sanitize(body: Partial<SiteConfig>, current: SiteConfig): SiteConfig {
  const gallery: GalleryImage[] = Array.isArray(body.gallery)
    ? body.gallery
        .filter((g) => g && typeof g.url === "string")
        .map((g) => ({
          url: g.url,
          caption: str(g.caption),
          featured: !!g.featured,
        }))
    : current.gallery;

  return mergeConfig({
    server: {
      ip: str(body.server?.ip, current.server.ip).trim(),
      port: str(body.server?.port, current.server.port).trim(),
      slots: str(body.server?.slots, current.server.slots).trim(),
      currentMap: str(body.server?.currentMap, current.server.currentMap).trim(),
      lastWipe: str(body.server?.lastWipe, current.server.lastWipe).trim(),
      nextWipe: str(body.server?.nextWipe, current.server.nextWipe).trim(),
    },
    social: {
      discord: str(body.social?.discord, current.social.discord).trim(),
      youtube: str(body.social?.youtube, current.social.youtube).trim(),
      vote: str(body.social?.vote, current.social.vote).trim(),
    },
    mods: Array.isArray(body.mods)
      ? body.mods.map((m) => str(m).trim()).filter(Boolean)
      : current.mods,
    banner: {
      enabled: !!body.banner?.enabled,
      text: str(body.banner?.text).slice(0, 300),
      textEn: str(body.banner?.textEn).slice(0, 300),
      variant: variants.includes(body.banner?.variant as BannerVariant)
        ? (body.banner!.variant as BannerVariant)
        : "info",
      link: str(body.banner?.link).trim(),
    },
    gallery,
    clips: {
      featuredId: str(body.clips?.featuredId).trim(),
      hiddenIds: Array.isArray(body.clips?.hiddenIds)
        ? body.clips!.hiddenIds.map((x) => str(x)).filter(Boolean)
        : current.clips.hiddenIds,
    },
  });
}

export async function PUT(req: Request) {
  const body = (await req.json().catch(() => null)) as Partial<SiteConfig> | null;
  if (!body) return NextResponse.json({ error: "Body inválido" }, { status: 400 });

  const current = await getSiteConfigFresh();
  const saved = await saveSiteConfig(sanitize(body, current));
  return NextResponse.json(saved);
}
