"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

/** Botón que copia un texto al portapapeles con feedback visual. */
export function CopyChip({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard no disponible */
    }
  };

  return (
    <button
      onClick={copy}
      className="group flex items-center gap-3 border border-ash-500 bg-ash-800/80 px-4 py-2.5 transition-colors hover:border-ember/70 [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)]"
    >
      {label && (
        <span className="block text-left font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-smoke">
          {label}
        </span>
      )}
      <span className="font-mono text-sm font-semibold text-ember">{value}</span>
      {copied ? (
        <Icon.check className="h-5 w-5 text-emerald-400" />
      ) : (
        <Icon.copy className="h-5 w-5 text-smoke transition-colors group-hover:text-ember" />
      )}
    </button>
  );
}
