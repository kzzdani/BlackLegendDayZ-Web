import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Indica qué piezas del panel están configuradas (para avisos en el dashboard).
export async function GET() {
  return NextResponse.json({
    blob: !!process.env.BLOB_READ_WRITE_TOKEN,
    sessionSecret: !!process.env.SESSION_SECRET,
    discordBot: !!process.env.DISCORD_BOT_TOKEN,
  });
}
