"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

/**
 * Lightbox global. Cualquier elemento con `data-lightbox="grupo"` y
 * `data-full="/ruta.webp"` (o que contenga un <img>) se abre ampliado al
 * clicarlo. Navega entre los del mismo grupo con las flechas.
 */
export function Lightbox() {
  const [group, setGroup] = useState<string[] | null>(null);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => setGroup(null), []);
  const next = useCallback(
    () => setGroup((g) => (g ? (setIndex((i) => (i + 1) % g.length), g) : g)),
    [],
  );
  const prev = useCallback(
    () => setGroup((g) => (g ? (setIndex((i) => (i - 1 + g.length) % g.length), g) : g)),
    [],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-lightbox]");
      if (!el) return;
      const name = el.dataset.lightbox!;
      const all = Array.from(
        document.querySelectorAll<HTMLElement>(`[data-lightbox="${name}"]`),
      );
      const srcOf = (n: HTMLElement) =>
        n.dataset.full || n.querySelector("img")?.currentSrc || (n as HTMLImageElement).src || "";
      const list = all.map(srcOf).filter(Boolean);
      const i = all.indexOf(el);
      if (!list.length) return;
      e.preventDefault();
      setGroup(list);
      setIndex(Math.max(i, 0));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!group) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [group, close, next, prev]);

  return (
    <AnimatePresence>
      {group && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
          className="fixed inset-0 z-[250] flex items-center justify-center bg-void/95 p-4 backdrop-blur-sm sm:p-10"
        >
          {/* Cerrar */}
          <button
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-ash-600 bg-ash-900/80 text-bone transition-colors hover:border-ember/70 hover:text-ember"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {group.length > 1 && (
            <>
              <Nav side="left" onClick={prev} />
              <Nav side="right" onClick={next} />
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-sm text-smoke">
                {index + 1} / {group.length}
              </span>
            </>
          )}

          <motion.img
            key={group[index]}
            src={group[index]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-full max-w-full border border-ash-700 object-contain shadow-[0_0_60px_-10px_rgba(0,0,0,0.9)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Nav({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Anterior" : "Siguiente"}
      className={`absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-ash-600 bg-ash-900/80 text-bone transition-colors hover:border-ember/70 hover:text-ember ${
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-6 w-6 ${side === "left" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>
  );
}
