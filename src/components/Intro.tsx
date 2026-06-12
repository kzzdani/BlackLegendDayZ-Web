"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Intro cinematográfica del fénix. Una vez por sesión, saltable al click. */
export function Intro() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("bl-intro")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("bl-intro", "1");
      return;
    }
    sessionStorage.setItem("bl-intro", "1");
    setShow(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          onClick={() => setShow(false)}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-void"
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 vignette" />
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 rounded-full bg-ember/25 blur-[80px]" />
            <Image
              src="/brand/0logosoloBlackLegend.png"
              alt=""
              width={260}
              height={260}
              priority
              className="h-40 w-40 animate-flicker drop-glow sm:h-52 sm:w-52"
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 10, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-[28%] font-stencil text-xs uppercase text-ember sm:text-sm"
          >
            Black Legend
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
