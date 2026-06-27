import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = "Black Legend DayZ — Servidor de DayZ en Livonia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fénix incrustado (data URI) para que aparezca en la previsualización del enlace.
const phoenixSrc = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/brand/phoenix-og.png"),
).toString("base64")}`;

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
          alignItems: "center",
          background:
            "radial-gradient(1100px 700px at 72% 45%, #2a1206 0%, #0a0a0d 58%, #07070a 100%)",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          color: "#ece6db",
        }}
      >
        {/* Columna de texto */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            flex: 1,
          }}
        >
          <div style={{ display: "flex", letterSpacing: 10, fontSize: 26, color: "#ff6a1a", fontWeight: 700 }}>
            SERVIDOR DE DAYZ · COMUNIDAD HISPANA
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 132, fontWeight: 900, lineHeight: 0.92, letterSpacing: -4 }}>
              <span style={{ color: "#ece6db" }}>BLACK</span>
              <span style={{ color: "#ff7a1a" }}>LEGEND</span>
            </div>
            <div style={{ display: "flex", letterSpacing: 22, fontSize: 40, color: "#ffb02e", fontWeight: 800, marginTop: 10 }}>
              DAYZ
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
              <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
                {players != null ? `${players}/${max} jugadores online` : "Livonia · 100% PvP"}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                fontSize: 28,
                fontWeight: 700,
                color: "#ff6a1a",
                border: "2px solid #2c2f37",
                background: "#111114",
                padding: "12px 22px",
              }}
            >
              {site.server.ip}:{site.server.port}
            </div>
          </div>
        </div>

        {/* Fénix */}
        <img
          src={phoenixSrc}
          width={474}
          height={500}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    size,
  );
}
