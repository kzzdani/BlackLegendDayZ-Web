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

// Fecha real codificada en el ID (snowflake) de Discord.
function tsFromId(id: string) {
  return new Date(Number((BigInt(id) >> 22n) + 1420070400000n)).toISOString();
}

// Comunicados reales (de capturas) para la DEMO visual. Solo se muestran si
// DEMO_ANNOUNCEMENTS=1 y no hay bot configurado.
const demoItems: Msg[] = [
  {
    id: "1514924739825766400",
    author: "Katha Romanoff",
    content:
      "Aviso sobre el bug de DayZ 1.29\n\nHola buenos días chicos, sí, somos conscientes del bug de la 1.29, que se supone que habían parcheado, pero no...! Es un fallo del propio DayZ, no del servidor. Esperad entre 1 y 5 minutos antes de volver a intentar entrar para que el servidor y el cliente puedan sincronizarse correctamente.",
  },
  {
    id: "1509292634936709210",
    author: "Jaro93",
    content:
      "WIPE WIPE WIPE\n\nEl día 28 de mayo junto al WIPE cambiaremos de mapa a Livonia. Pensamos que Chernarus es un mapa demasiado grande para un servidor de PvP, es difícil encontrar interacción aún teniendo +50 jugadores conectados, por lo tanto hemos optado por cambiar de mapa.",
  },
  {
    id: "1509124578293841950",
    author: "Jaro93",
    content:
      "Se ha añadido el arma Tundra (el vanilla de toda la vida) al spawn. Por defecto Livonia lo trae a 0, nos hemos dado cuenta ahora. Saldrá en zonas de caza tier2 y tier3. Se aplicará después del próximo restart.",
  },
  {
    id: "1506697710718423111",
    author: "Jaro93",
    content:
      "Antes de generar descontentos y malentendidos hemos modificado parte de la normativa: una base sin codelock más de 3 días se considera base abandonada.",
  },
].map((m) => ({ ...m, timestamp: tsFromId(m.id) }));

export async function GET() {
  const token = process.env.DISCORD_BOT_TOKEN;
  const channel = process.env.DISCORD_ANNOUNCEMENTS_CHANNEL_ID;

  // Sin bot: demo visual (si está activada) o sección invisible.
  if (!token || !channel) {
    const demo = process.env.DEMO_ANNOUNCEMENTS === "1" ? demoItems : [];
    return NextResponse.json({ items: demo });
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
