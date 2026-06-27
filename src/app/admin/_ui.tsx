"use client";

import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export function Card({
  children,
  className,
  title,
  desc,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  desc?: string;
}) {
  return (
    <section className={cn("border border-ash-700 bg-ash-900/60 p-6", className)}>
      {title && (
        <header className="mb-5">
          <h2 className="font-display text-xl font-bold uppercase tracking-wide text-bone">
            {title}
          </h2>
          {desc && <p className="mt-1 text-sm text-smoke">{desc}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

export function Button({
  children,
  variant = "fire",
  className,
  ...rest
}: {
  children: ReactNode;
  variant?: "fire" | "steel" | "danger" | "ghost";
} & ComponentProps<"button">) {
  const variants = {
    fire: "bg-ember text-[#160600] hover:brightness-110 disabled:opacity-50",
    steel: "border border-ash-500 bg-ash-800/70 text-bone hover:border-ember/70",
    danger: "border border-blood/60 bg-blood/10 text-red-300 hover:bg-blood/20",
    ghost: "text-smoke hover:text-ember",
  };
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 px-4 font-display text-sm font-bold uppercase tracking-widest transition disabled:cursor-not-allowed",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-stencil text-[0.6rem] uppercase tracking-[0.2em] text-smoke">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ash-400">{hint}</span>}
    </label>
  );
}

export function Input(props: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={cn(
        "h-10 w-full border border-ash-600 bg-ash-950 px-3 text-sm text-bone outline-none transition focus:border-ember/70",
        props.className,
      )}
    />
  );
}

export function Textarea(props: ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full border border-ash-600 bg-ash-950 px-3 py-2 text-sm text-bone outline-none transition focus:border-ember/70",
        props.className,
      )}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3"
    >
      <span
        className={cn(
          "relative h-6 w-11 rounded-full border transition",
          checked ? "border-ember bg-ember/30" : "border-ash-500 bg-ash-800",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full transition-all",
            checked ? "left-6 bg-ember" : "left-0.5 bg-ash-400",
          )}
        />
      </span>
      {label && <span className="text-sm text-bone">{label}</span>}
    </button>
  );
}
