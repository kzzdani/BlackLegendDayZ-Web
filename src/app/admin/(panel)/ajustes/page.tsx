"use client";

import { useEffect, useState } from "react";
import type { BannerVariant, SiteConfig } from "@/lib/config";
import { Button, Card, Field, Input, Textarea, Toggle } from "../../_ui";

export default function AjustesPage() {
  const [cfg, setCfg] = useState<SiteConfig | null>(null);
  const [modsText, setModsText] = useState("");
  const [hiddenText, setHiddenText] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((c: SiteConfig) => {
        setCfg(c);
        setModsText(c.mods.join("\n"));
        setHiddenText(c.clips.hiddenIds.join("\n"));
      })
      .catch(() => {});
  }, []);

  if (!cfg) return <p className="text-smoke">Cargando…</p>;

  const set = (patch: Partial<SiteConfig>) => setCfg({ ...cfg, ...patch });

  async function save() {
    setBusy(true);
    setMsg(null);
    const payload: SiteConfig = {
      ...cfg!,
      mods: modsText.split("\n").map((s) => s.trim()).filter(Boolean),
      clips: {
        ...cfg!.clips,
        hiddenIds: hiddenText.split(/[\n,]/).map((s) => s.trim()).filter(Boolean),
      },
    };
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (res.ok) {
        setCfg(d);
        setMsg({ ok: true, text: "Ajustes guardados. Los cambios ya están en la web." });
      } else {
        setMsg({ ok: false, text: d.error || "Error al guardar." });
      }
    } catch {
      setMsg({ ok: false, text: "Error de red." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-bone">
          Ajustes
        </h1>
        <p className="mt-1 text-sm text-smoke">
          Edita los datos de la web sin tocar código. Pulsa <strong>Guardar</strong> al terminar.
        </p>
      </div>

      {/* Servidor */}
      <Card title="Datos del servidor">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="IP">
            <Input
              value={cfg.server.ip}
              onChange={(e) => set({ server: { ...cfg.server, ip: e.target.value } })}
            />
          </Field>
          <Field label="Puerto">
            <Input
              value={cfg.server.port}
              onChange={(e) => set({ server: { ...cfg.server, port: e.target.value } })}
            />
          </Field>
          <Field label="Slots (jugadores máx.)">
            <Input
              value={cfg.server.slots}
              onChange={(e) => set({ server: { ...cfg.server, slots: e.target.value } })}
            />
          </Field>
          <Field label="Mapa actual">
            <Input
              value={cfg.server.currentMap}
              onChange={(e) => set({ server: { ...cfg.server, currentMap: e.target.value } })}
            />
          </Field>
          <Field label="Último wipe" hint="Mueve el contador de 'días desde el wipe'.">
            <Input
              type="date"
              value={cfg.server.lastWipe}
              onChange={(e) => set({ server: { ...cfg.server, lastWipe: e.target.value } })}
            />
          </Field>
          <Field label="Próximo wipe (opcional)" hint="Si lo pones, la web muestra cuenta atrás.">
            <Input
              type="date"
              value={cfg.server.nextWipe}
              onChange={(e) => set({ server: { ...cfg.server, nextWipe: e.target.value } })}
            />
          </Field>
        </div>
      </Card>

      {/* Redes */}
      <Card title="Enlaces / redes">
        <div className="grid gap-4">
          <Field label="Discord (enlace de invitación)">
            <Input
              value={cfg.social.discord}
              onChange={(e) => set({ social: { ...cfg.social, discord: e.target.value } })}
            />
          </Field>
          <Field label="YouTube">
            <Input
              value={cfg.social.youtube}
              onChange={(e) => set({ social: { ...cfg.social, youtube: e.target.value } })}
            />
          </Field>
          <Field label="Votar (Top-Games)">
            <Input
              value={cfg.social.vote}
              onChange={(e) => set({ social: { ...cfg.social, vote: e.target.value } })}
            />
          </Field>
        </div>
      </Card>

      {/* Mods */}
      <Card title="Mods" desc="Uno por línea. Aparecen en la página 'El servidor'.">
        <Textarea
          rows={6}
          value={modsText}
          onChange={(e) => setModsText(e.target.value)}
          placeholder={"BlackLegendCore\nCode Lock\n…"}
        />
      </Card>

      {/* Banner */}
      <Card title="Banner de aviso" desc="Franja arriba de la web para anunciar wipes, eventos o mantenimiento.">
        <div className="space-y-4">
          <Toggle
            checked={cfg.banner.enabled}
            onChange={(v) => set({ banner: { ...cfg.banner, enabled: v } })}
            label="Mostrar banner en la web"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Texto (español)">
              <Input
                value={cfg.banner.text}
                onChange={(e) => set({ banner: { ...cfg.banner, text: e.target.value } })}
                placeholder="WIPE este sábado a las 20:00"
                maxLength={300}
              />
            </Field>
            <Field label="Texto (inglés, opcional)">
              <Input
                value={cfg.banner.textEn}
                onChange={(e) => set({ banner: { ...cfg.banner, textEn: e.target.value } })}
                placeholder="WIPE this Saturday at 20:00"
                maxLength={300}
              />
            </Field>
            <Field label="Estilo">
              <select
                value={cfg.banner.variant}
                onChange={(e) =>
                  set({ banner: { ...cfg.banner, variant: e.target.value as BannerVariant } })
                }
                className="h-10 w-full border border-ash-600 bg-ash-950 px-3 text-sm text-bone outline-none focus:border-ember/70"
              >
                <option value="info">Info (naranja)</option>
                <option value="event">Evento (dorado)</option>
                <option value="warning">Aviso (rojo)</option>
              </select>
            </Field>
            <Field label="Enlace (opcional)" hint="Si lo pones, el banner será clicable.">
              <Input
                value={cfg.banner.link}
                onChange={(e) => set({ banner: { ...cfg.banner, link: e.target.value } })}
                placeholder="https://discord.gg/…"
              />
            </Field>
          </div>
        </div>
      </Card>

      {/* Clips */}
      <Card title="Clips de YouTube" desc="Los clips salen automáticos del canal. Aquí puedes destacar u ocultar alguno.">
        <div className="grid gap-4">
          <Field label="ID del clip destacado (opcional)" hint="El ID es lo que va tras 'watch?v=' en la URL de YouTube. Vacío = automático.">
            <Input
              value={cfg.clips.featuredId}
              onChange={(e) => set({ clips: { ...cfg.clips, featuredId: e.target.value } })}
              placeholder="dQw4w9WgXcQ"
            />
          </Field>
          <Field label="IDs a ocultar (uno por línea)">
            <Textarea
              rows={3}
              value={hiddenText}
              onChange={(e) => setHiddenText(e.target.value)}
              placeholder="abc123\ndef456"
            />
          </Field>
        </div>
      </Card>

      {msg && (
        <p className={`text-sm ${msg.ok ? "text-emerald-400" : "text-red-400"}`}>{msg.text}</p>
      )}

      <div className="sticky bottom-4 flex justify-end">
        <Button onClick={save} disabled={busy} className="shadow-[0_0_30px_-6px_rgba(255,106,26,0.7)]">
          {busy ? "Guardando…" : "Guardar cambios"}
        </Button>
      </div>
    </div>
  );
}
