"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Scroll suave global (Lenis). Da la sensación de "peso" cinematográfico
 * al desplazamiento. Compatible con framer-motion useScroll.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
