"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "ok" | "error";

const inputCls =
  "w-full border border-ash-600 bg-ash-850 px-4 py-3 font-body text-sm text-bone placeholder:text-ash-400 transition-colors focus:border-ember/70 focus:outline-none";

export function ReportForm() {
  const t = useTranslations("report");
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ nick: "", suspect: "", details: "", website: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.details.trim().length < 5 || status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("ok");
        setForm({ nick: "", suspect: "", details: "", website: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="border border-ash-700 bg-ash-900 p-7 sm:p-9">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-ember/40 bg-ember/10 text-ember">
          <Icon.shield className="h-6 w-6" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold uppercase leading-none text-bone">
            {t("title")}
          </h2>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-smoke">{t("subtitle")}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-smoke">
            {t("nickLabel")}
          </span>
          <input
            type="text"
            value={form.nick}
            onChange={set("nick")}
            maxLength={80}
            placeholder={t("nickPlaceholder")}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-smoke">
            {t("suspectLabel")}
          </span>
          <input
            type="text"
            value={form.suspect}
            onChange={set("suspect")}
            maxLength={120}
            placeholder={t("suspectPlaceholder")}
            className={inputCls}
          />
        </label>
      </div>

      <label className="mt-3 block">
        <span className="mb-1.5 block font-stencil text-[0.55rem] uppercase tracking-[0.25em] text-smoke">
          {t("detailsLabel")}
        </span>
        <textarea
          value={form.details}
          onChange={set("details")}
          required
          minLength={5}
          maxLength={1500}
          rows={4}
          placeholder={t("detailsPlaceholder")}
          className={cn(inputCls, "resize-y")}
        />
      </label>

      {/* Honeypot anti-bots (oculto) */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={set("website")}
        className="hidden"
        aria-hidden
      />

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden bg-ember px-7 font-display font-bold uppercase tracking-widest text-[#160600] transition-all duration-300 disabled:opacity-60 [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-core/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative z-10 inline-flex items-center gap-2">
            <Icon.discord className="h-5 w-5" />
            {status === "sending" ? t("sending") : t("submit")}
          </span>
        </button>

        {status === "ok" && (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <Icon.check className="h-5 w-5" />
            {t("success")}
          </span>
        )}
        {status === "error" && (
          <span className="text-sm font-semibold text-blood">{t("error")}</span>
        )}
      </div>
    </form>
  );
}
