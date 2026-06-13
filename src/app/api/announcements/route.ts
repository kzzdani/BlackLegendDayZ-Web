import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type Msg = { id: string; content: string; author: string; timestamp: string };

// Limpieza básica de markdown de Discord para mostrarlo legible.
function clean(s: string) {
  return s
    .replace(/@everyone|@here/g, "")
    .replace(/<a?:\w+:\d+>/g, "") // emojis custom
    .replace(/<@&?\d+>/g, "") // menciones de rol/usuario
    .replace(/\*\*|__|~~|`/g, "") // negrita/subrayado/tachado/code
    .replace(/^>\s?/gm, "") // citas
    .trim();
}

export async function GET() {
  const token = process.env.DISCORD_BOT_TOKEN;
  const channel = process.env.DISCORD_ANNOUNCEMENTS_CHANNEL_ID;

  // Sin configurar → sección invisible (no rompe nada).
  if (!token || !channel) {
    return NextResponse.json({ items: [] as Msg[] });
  }

  try {
    const res = await fetch(
      `https://discord.com/api/v10/channels/${channel}/messages?limit=8`,
      {
        headers: {
          Authorization: `Bot ${token}`,
          "User-Agent": "BlackLegendDayZ/1.0 (+https://black-legend-day-z-web.vercel.app)",
        },
        next: { revalidate: 300 },
      },
    );
    if (!res.ok) return NextResponse.json({ items: [] as Msg[] });

    const raw = (await res.json()) as Array<{
      id: string;
      content: string;
      timestamp: string;
      author?: { global_name?: string; username?: string };
    }>;

    const items: Msg[] = raw
      .filter((m) => m.content && m.content.trim().length > 0)
      .map((m) => ({
        id: m.id,
        content: clean(m.content).slice(0, 500),
        author: m.author?.global_name || m.author?.username || "Black Legend",
        timestamp: m.timestamp,
      }))
      .filter((m) => m.content.length > 0)
      .slice(0, 4);

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] as Msg[] });
  }
}
