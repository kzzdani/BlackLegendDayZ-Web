"use client";

import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

/**
 * Al cambiar de página, Lenis conserva la posición de scroll anterior y deja
 * al usuario donde estaba (a veces al final). Esto fuerza el scroll al top en
 * cada cambio de ruta. Los anchors de la misma página (#...) no se ven
 * afectados porque usePathname ignora el hash.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}
