"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Embers } from "@/components/Embers";

type Chapter = { title: string; text: string };

export function StorySection() {
  const t = useTranslations("story");
  const chapters = t.raw("chapters") as Chapter[];
  const cap = t("cap");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.5]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-ash-950 to-void" />
        <div className="absolute inset-0 bg-grid opacity-40 vignette" />
        <Embers density={0.00008} />

        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/30 blur-[100px]"
        />

        <motion.div
          style={{ rotate: ringRotate }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[78vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ash-600/40"
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_12px_var(--color-ember)]" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="relative h-[60vh] w-full max-w-2xl text-center">
            {chapters.map((c, i) => (
              <ChapterView
                key={i}
                chapter={c}
                cap={cap}
                index={i}
                total={chapters.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <ProgressDots progress={scrollYProgress} total={chapters.length} />
      </div>
    </section>
  );
}

function ChapterView({
  chapter,
  cap,
  index,
  total,
  progress,
}: {
  chapter: Chapter;
  cap: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const mid = start + seg / 2;
  const end = (index + 1) * seg;

  const opacity = useTransform(
    progress,
    [start, start + seg * 0.18, end - seg * 0.18, end],
    index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, mid, end], [40, 0, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
    >
      <span className="font-stencil text-sm tracking-[0.4em] text-ember">
        {cap} {String(index + 1).padStart(2, "0")}
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
