"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const CODE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

type Drop = { id: number; left: number; size: number; delay: number; dur: number; rot: number };

export function Konami() {
  const [active, setActive] = useState(false);
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf.push(e.key.toLowerCase());
      if (buf.length > CODE.length) buf = buf.slice(-CODE.length);
      if (buf.length === CODE.length && CODE.every((k, i) => buf[i] === k)) {
        buf = [];
        setDrops(
          Array.from({ length: 28 }, (_, id) => ({
            id,
            left: Math.random() * 100,
            size: 26 + Math.random() * 42,
            delay: Math.random() * 1.2,
            dur: 2.4 + Math.random() * 2.2,
            rot: (Math.random() - 0.5) * 120,
          })),
        );
        setActive(true);
        setTimeout(() => setActive(false), 5200);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="konami"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[280] overflow-hidden"
        >
          {drops.map((d) => (
            <motion.div
              key={d.id}
              initial={{ y: "-15vh", opacity: 0, rotate: 0 }}
              animate={{ y: "115vh", opacity: [0, 1, 1, 0.8], rotate: d.rot }}
              transition={{ duration: d.dur, delay: d.delay, ease: "easeIn" }}
              style={{ left: `${d.left}%`, width: d.size, height: d.size }}
              className="absolute top-0 drop-glow"
            >
              <Image
                src="/brand/0logosoloBlackLegendNuevo2.png"
                alt=""
                width={64}
                height={64}
                className="h-full w-full"
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-ember/50 bg-void/80 px-8 py-5 text-center backdrop-blur-sm"
          >
            <p className="font-display text-3xl font-black uppercase text-fire sm:text-4xl">
              ¡Has despertado al fénix!
            </p>
            <p className="mt-1 font-stencil text-[0.6rem] uppercase tracking-[0.3em] text-smoke">
              Renace de las cenizas
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
