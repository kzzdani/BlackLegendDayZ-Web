import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Black Legend DayZ — Servidor de DayZ en Livonia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function getPlayers() {
  try {
    const res = await fetch(
      `https://api.battlemetrics.com/servers/${site.server.battlemetricsId}`,
      {
        headers: {
          "User-Agent": "BlackLegendDayZ/1.0 (+https://black-legend-day-z-web.vercel.app)",
          Accept: "application/json",
        },
        next: { revalidate: 60 },
      },
    );
    if (res.ok) {
      const j = await res.json();
      const a = j?.data?.attributes;
      if (a) return { players: a.players as number, max: a.maxPlayers as number, online: a.status === "online" };
    }
  } catch {
    /* sin datos */
  }
  return { players: null as number | null, max: Number(site.server.slots) || 70, online: true };
}

export default async function Image() {
  const { players, max, online } = await getPlayers();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1000px 600px at 50% 18%, #2a1206 0%, #0a0a0d 55%, #07070a 100%)",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          color: "#ece6db",
        }}
      >
        <div style={{ display: "flex", letterSpacing: 10, fontSize: 26, color: "#ff6a1a", fontWeight: 700 }}>
          SERVIDOR DE DAYZ · COMUNIDAD HISPANA
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 150, fontWeight: 900, lineHeight: 1, letterSpacing: -4 }}>
            <span style={{ color: "#ece6db" }}>BLACK</span>
            <span style={{ color: "#ff7a1a", marginLeft: 28 }}>LEGEND</span>
          </div>
          <div style={{ display: "flex", letterSpacing: 22, fontSize: 40, color: "#ffb02e", fontWeight: 800, marginTop: 8 }}>
            DAYZ
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 22,
                background: online ? "#34d399" : "#b81e0a",
                boxShadow: `0 0 24px ${online ? "#34d399" : "#b81e0a"}`,
              }}
            />
            <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
              {players != null ? `${players}/${max} jugadores online` : "Livonia · 100% PvP"}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 700,
              color: "#ff6a1a",
              border: "2px solid #2c2f37",
              background: "#111114",
              padding: "14px 24px",
            }}
          >
            {site.server.ip}:{site.server.port}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
