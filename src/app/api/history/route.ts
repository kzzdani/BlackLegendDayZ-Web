import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const stop = new Date();
  const start = new Date(stop.getTime() - 24 * 60 * 60 * 1000);

  const out: {
    points: { t: string; v: number }[];
    peak: number;
    peakHour: string | null;
    avg: number;
  } = { points: [], peak: 0, peakHour: null, avg: 0 };

  try {
    const url =
      `https://api.battlemetrics.com/servers/${site.server.battlemetricsId}` +
      `/player-count-history?start=${start.toISOString()}&stop=${stop.toISOString()}&resolution=60`;
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (res.ok) {
      const json = await res.json();
      const pts: { t: string; v: number }[] = (json?.data ?? [])
        .map((p: { attributes: { timestamp: string; value: number | null } }) => ({
          t: p.attributes.timestamp,
          v: p.attributes.value ?? 0,
        }))
        .sort((a: { t: string }, b: { t: string }) => a.t.localeCompare(b.t));

      out.points = pts;
      if (pts.length) {
        const max = Math.max(...pts.map((p) => p.v));
        out.peak = max;
        out.peakHour = pts.find((p) => p.v === max)?.t ?? null;
        out.avg = Math.round(pts.reduce((s, p) => s + p.v, 0) / pts.length);
      }
    }
  } catch {
    /* sin historial */
  }

  return NextResponse.json(out, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
    },
  });
}
