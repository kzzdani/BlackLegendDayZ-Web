import { NextResponse } from "next/server";
import { recordVisit } from "@/lib/analytics";

export const dynamic = "force-dynamic";

// Registra una visita, pero solo una vez por visitante y día (candado por cookie).
export async function POST(req: Request) {
  const day = new Date().toISOString().slice(0, 10);
  const res = new NextResponse(null, { status: 204 });

  // Si ya contamos a este visitante hoy, no hacemos nada (ni tocamos Blob).
  const already = req.headers.get("cookie")?.includes(`blv=${day}`);
  if (already) return res;

  const { path } = (await req.json().catch(() => ({ path: "/" }))) as { path?: string };
  await recordVisit(typeof path === "string" ? path : "/");

  res.cookies.set("blv", day, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return res;
}
