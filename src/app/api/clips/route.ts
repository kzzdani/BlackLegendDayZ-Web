import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

function decode(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function GET() {
  const out: { clips: { id: string; title: string }[] } = { clips: [] };
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${site.social.youtubeChannelId}`,
      {
        headers: { "User-Agent": "BlackLegendDayZ/1.0 (+https://black-legend-day-z-web.vercel.app)" },
        next: { revalidate: 3600 },
      },
    );
    if (res.ok) {
      const xml = await res.text();
      out.clips = xml
        .split("<entry>")
        .slice(1)
        .map((e) => {
          const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
          const title = e.match(/<title>([^<]+)<\/title>/)?.[1];
          return id ? { id, title: decode(title ?? "Black Legend DayZ") } : null;
        })
        .filter((c): c is { id: string; title: string } => c !== null)
        .slice(0, 9);
    }
  } catch {
    /* sin clips */
  }

  return NextResponse.json(out, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
  });
}
