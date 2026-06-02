"use client";

import { useEffect, useRef } from "react";

type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  life: number;
  maxLife: number;
  hue: number;
};

/**
 * Brasas ascendentes dibujadas en canvas. Ligero (rAF + DPR controlado) y
 * respeta prefers-reduced-motion. Da vida al fondo sin imágenes pesadas.
 */
export function Embers({
  density = 0.00009,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let embers: Ember[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.floor(w * h * density);
      embers = Array.from({ length: target }, () => spawn(w, h, true));
    };

    const spawn = (w: number, h: number, anywhere = false): Ember => {
      const maxLife = 220 + Math.random() * 260;
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 10,
        r: 0.6 + Math.random() * 1.9,
        vy: -(0.18 + Math.random() * 0.55),
        vx: (Math.random() - 0.5) * 0.25,
        life: anywhere ? Math.random() * maxLife : 0,
        maxLife,
        hue: 18 + Math.random() * 26,
      };
    };

    const tick = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const e of embers) {
        e.life += 1;
        e.x += e.vx + Math.sin(e.life * 0.02) * 0.18;
        e.y += e.vy;
        const t = e.life / e.maxLife;
        const alpha = Math.sin(Math.min(t, 1) * Math.PI) * 0.85;
        ctx.beginPath();
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 4);
        grad.addColorStop(0, `hsla(${e.hue}, 100%, 65%, ${alpha})`);
        grad.addColorStop(1, `hsla(${e.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(e.x, e.y, e.r * 4, 0, Math.PI * 2);
        ctx.fill();
        if (e.life >= e.maxLife || e.y < -20) Object.assign(e, spawn(w, h));
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}
