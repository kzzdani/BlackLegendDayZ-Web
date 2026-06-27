"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Avisa a /api/track de cada visita (el servidor cuenta 1 por visitante/día). */
export function VisitTracker() {
  const pathname = usePathname();
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);
  return null;
}
