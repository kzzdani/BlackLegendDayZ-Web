"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Barra de progreso de scroll fija arriba del todo. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-blood via-ember to-gold shadow-[0_0_8px_rgba(255,106,26,0.7)]"
    />
  );
}
