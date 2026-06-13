import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const clean = (s: unknown, n: number) => String(s ?? "").trim().slice(0, n);

export async function POST(req: Request) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) {
    return NextResponse.json({ ok: false, error: "config" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-request" }, { status: 400 });
  }

  // Honeypot anti-bots: si viene relleno, lo descartamos en silencio.
  if (clean(body.website, 10)) {
    return NextResponse.json({ ok: true });
  }

  const nick = clean(body.nick, 80);
  const suspect = clean(body.suspect, 120);
  const details = clean(body.details, 1500);

  if (details.length < 5) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const payload = {
    username: "Web · Reportes",
    embeds: [
      {
        title: "📩 Nuevo mensaje desde la web",
        color: 0xff6a1a,
        fields: [
          { name: "De", value: nick || "—", inline: true },
          { name: "Asunto / sospechoso", value: suspect || "—", inline: true },
          { name: "Mensaje", value: details },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "discord" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
