"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Embers } from "@/components/Embers";

const chapters = [
  {
    n: "01",
    title: "El mundo cayó",
    text: "La infección arrasó Chernarus en cuestión de días. Las ciudades ardieron, los gobiernos colapsaron y la civilización se convirtió en un recuerdo lejano enterrado bajo los escombros.",
  },
  {
    n: "02",
    title: "Solo quedó el frío",
    text: "En los confines helados de Sakhal, la nieve entierra a los débiles. El hambre, las balas y el invierno cazan a quien baja la guardia. Aquí no hay segundas oportunidades.",
  },
  {
    n: "03",
    title: "Las leyendas renacen",
    text: "Pero del fuego siempre surge algo nuevo. Como el fénix, los que sobreviven se levantan más fuertes. Esta es tu historia. Esta es Black Legend.",
  },
];

export function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Fénix: crece y se enciende con el progreso (suave, queda de fondo)
  const phoenixScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.12]);
  const phoenixOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.14, 0.34, 0.55],
  );
  const phoenixBlur = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const filter = useTransform(phoenixBlur, (b) => `blur(${b}px)`);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.5]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Fondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-void via-ash-950 to-void" />
        <div className="absolute inset-0 bg-grid opacity-40 vignette" />
        <Embers density={0.00008} />

        {/* Resplandor */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/30 blur-[100px]"
        />

        {/* Anillo decorativo */}
        <motion.div
          style={{ rotate: ringRotate }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[78vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ash-600/40"
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_12px_var(--color-ember)]" />
        </motion.div>

        {/* Fénix */}
        <motion.div
          style={{ scale: phoenixScale, opacity: phoenixOpacity, filter }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/brand/0logosoloBlackLegendNuevo2.png"
            alt=""
            width={620}
            height={620}
            className="h-[54vmin] w-auto"
          />
        </motion.div>

        {/* Velo oscuro tras el texto (legibilidad sobre el fénix) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-[48vmin] w-[82vmin] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-void/70 blur-3xl"
        />

        {/* Capítulos */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="relative h-[60vh] w-full max-w-2xl text-center">
            {chapters.map((c, i) => (
              <Chapter
                key={c.n}
                chapter={c}
                index={i}
                total={chapters.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Barra de progreso lateral */}
        <ProgressDots progress={scrollYProgress} total={chapters.length} />
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  index,
  total,
  progress,
}: {
  chapter: (typeof chapters)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const mid = start + seg / 2;
  const end = (index + 1) * seg;

  // Visible alrededor de su segmento, con entradas/salidas suaves
  const opacity = useTransform(
    progress,
    [start, start + seg * 0.18, end - seg * 0.18, end],
    index === total - 1
      ? [0, 1, 1, 1]
      : [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, mid, end], [40, 0, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
    >
      <span className="font-stencil text-sm tracking-[0.4em] text-ember">
        Cap. {chapter.n}
      </span>
      <h2 className="mt-4 font-display text-5xl font-black uppercase leading-[0.9] text-bone sm:text-7xl">
        {chapter.title}
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-smoke sm:text-lg">
        {chapter.text}
      </p>
    </motion.div>
  );
}

function ProgressDots({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  return (
    <div className="absolute right-6 top-1/2 flex -translate-y-1/2 flex-col gap-3 sm:right-10">
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} index={i} total={total} progress={progress} />
      ))}
    </div>
  );
}

function Dot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const opacity = useTransform(
    progress,
    [index * seg, index * seg + 0.01, (index + 1) * seg - 0.01, (index + 1) * seg],
    [0.3, 1, 1, 0.3],
  );
  const scale = useTransform(
    progress,
    [index * seg, index * seg + 0.05, (index + 1) * seg],
    [1, 1.6, 1],
  );
  return (
    <motion.span
      style={{ opacity, scale }}
      className="h-2 w-2 rounded-full bg-ember shadow-[0_0_8px_var(--color-ember)]"
    />
  );
}
