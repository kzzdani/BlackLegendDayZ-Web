"use client";

import { useEffect, useState } from "react";
import { CountUp } from "@/components/CountUp";
import { site } from "@/lib/site";

/** Días transcurridos desde el último wipe (cuenta hacia arriba). */
export function WipeDays() {
  const [lastWipe, setLastWipe] = useState<string>(site.server.lastWipe);
  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((c: { server?: { lastWipe?: string } }) => {
        if (c.server?.lastWipe) setLastWipe(c.server.lastWipe);
      })
      .catch(() => {});
  }, []);

  const wipe = new Date(`${lastWipe}T00:00:00`);
  const days = Math.max(0, Math.floor((Date.now() - wipe.getTime()) / 86_400_000));
  return <CountUp value={days} />;
}
