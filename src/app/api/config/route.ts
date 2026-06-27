import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/config";

// Config pública (datos de display) para componentes de cliente: banner,
// galería, ConnectBar, cuenta atrás de wipe. Cacheada vía getSiteConfig().
export async function GET() {
  const c = await getSiteConfig();
  return NextResponse.json(c, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
  });
}
