import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type Status = {
  serverOnline: boolean;
  players: number | null;
  maxPlayers: number;
  rank: number | null;
  members: number | null;
  online: number | null;
};

export async function GET() {
  const status: Status = {
    serverOnline: false,
    players: null,
    maxPlayers: Number(site.server.slots) || 70,
    rank: null,
    members: null,
    online: null,
  };

  // --- BattleMetrics: jugadores conectados ---
  const bmToken = process.env.BATTLEMETRICS_TOKEN;
  try {
    const res = await fetch(
      `https://api.battlemetrics.com/servers/${site.server.battlemetricsId}`,
      {
        headers: {
          "User-Agent":
            "BlackLegendDayZ/1.0 (+https://black-legend-day-z-web.vercel.app)",
          Accept: "application/json",
          ...(bmToken ? { Authorization: `Bearer ${bmToken}` } : {}),
        },
        next: { revalidate: 45 },
      },
    );
    if (res.ok) {
      const json = await res.json();
      const a = json?.data?.attributes;
      if (a) {
        status.serverOnline = a.status === "online";
        status.players = a.players ?? null;
        status.maxPlayers = a.maxPlayers ?? status.maxPlayers;
        status.rank = a.rank ?? null;
      }
    }
  } catch {
    /* sin datos de BattleMetrics */
  }

  // --- Discord: miembros y online ---
  try {
    const res = await fetch(
      `https://discord.com/api/v10/invites/${site.social.discordInvite}?with_counts=true`,
      { next: { revalidate: 45 } },
    );
    if (res.ok) {
      const json = await res.json();
      status.members = json?.approximate_member_count ?? null;
      status.online = json?.approximate_presence_count ?? null;
    }
  } catch {
    /* sin datos de Discord */
  }

  return NextResponse.json(status, {
    headers: { "Cache-Control": "public, s-maxage=45, stale-while-revalidate=120" },
  });
}
