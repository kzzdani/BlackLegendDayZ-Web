"use client";

import { CountUp } from "@/components/CountUp";
import { site } from "@/lib/site";

/** Días transcurridos desde el último wipe (cuenta hacia arriba). */
export function WipeDays() {
  const wipe = new Date(`${site.server.lastWipe}T00:00:00`);
  const days = Math.max(0, Math.floor((Date.now() - wipe.getTime()) / 86_400_000));
  return <CountUp value={days} />;
}
