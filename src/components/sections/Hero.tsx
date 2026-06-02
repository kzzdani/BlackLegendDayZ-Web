"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { useRef } from "react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui";
import { Embers } from "@/components/Embers";
import { Icon } from "@/components/icons";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yPhoenix = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yPattern = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scalePhoenix = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-16"
    >
      {/* Capas de fondo */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-ash-950 via-void to-void" />
      <motion.div
        style={{ y: yPattern }}
        className="absolute inset-0 -z-20 animate-drift opacity-[0.16] vignette"
      >
        <Image
          src="/brand/BIG_FONDO.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-20 bg-grid opacity-60 vignette" />

      {/* Resplandor de brasa tras el fénix */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-[60%] rounded-full bg-ember/20 blur-[90px]"
      />

      {/* Brasas */}
      <div className="absolute inset-0 -z-10">
        <Embers density={0.00012} />
      </div>

      {/* Contenido */}
      <motion.div
        style={{ opacity }}
        className="relative mx-auto w-full max-w-6xl px-5 text-center sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="eyebrow mb-6 justify-center"
        >
          Servidor de DayZ · Comunidad hispana
        </motion.p>

        {/* Logotipo: BLACK [fénix] LEGEND — rejilla simétrica (fénix centrado) */}
        <div className="grid grid-cols-1 items-center justify-items-center gap-1 sm:grid-cols-[1fr_auto_1fr] sm:gap-4 md:gap-8">
          <motion.h1
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black uppercase leading-[0.8] tracking-tighter text-bone sm:justify-self-end"
            style={{ fontSize: "clamp(3.5rem, 13vw, 9rem)" }}
          >
            Black
          </motion.h1>

          <motion.div
            style={{ y: yPhoenix, scale: scalePhoenix }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative shrink-0 sm:justify-self-center"
          >
            <Image
              src="/brand/0logosoloBlackLegend.png"
              alt="Fénix de Black Legend"
              width={300}
              height={300}
              priority
              className="h-[22vw] max-h-44 min-h-24 w-auto animate-flicker drop-glow"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black uppercase leading-[0.8] tracking-tighter text-bone sm:justify-self-start"
            style={{ fontSize: "clamp(3.5rem, 13vw, 9rem)" }}
          >
            Legend
          </motion.h1>
        </div>

        <motion.div style={{ y: yText }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-4 font-stencil text-lg uppercase text-ember/90 sm:text-2xl"
          >
            DayZ
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-smoke sm:text-lg"
          >
            {site.tagline}. Sobrevive al frío, conquista el mapa y{" "}
            <span className="text-bone">renace de las cenizas</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() =>
                lenis?.scrollTo("#conectar", { offset: -90, duration: 1.4 })
              }
            >
              Conéctate ahora
              <Icon.arrow className="h-4 w-4" />
            </Button>
            <Button
              href={site.social.discord}
              external
              variant="steel"
              size="lg"
            >
              <Icon.discord className="h-5 w-5" />
              Únete al Discord
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-smoke">
          <span className="font-stencil text-[0.6rem] uppercase tracking-[0.3em]">
            Desciende
          </span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-ash-500">
            <motion.span
              animate={{ y: [3, 14, 3], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="mt-1.5 h-1.5 w-1 rounded-full bg-ember"
            />
          </span>
        </div>
      </motion.div>

      {/* Degradado de transición inferior */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
