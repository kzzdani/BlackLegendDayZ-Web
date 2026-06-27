"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage, SiteConfig } from "@/lib/config";
import { Button, Card, Field, Input } from "../../_ui";

export default function GaleriaPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((c: SiteConfig) => {
        setConfig(c);
        setGallery(c.gallery);
      })
      .catch(() => {});
  }, []);

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("caption", caption);
      const res = await fetch("/api/admin/gallery", { method: "POST", body: fd });
      const d = await res.json();
      if (res.ok) {
        setGallery(d.gallery);
        setCaption("");
        if (fileRef.current) fileRef.current.value = "";
        setMsg({ ok: true, text: "Foto subida." });
      } else {
        setMsg({ ok: false, text: d.error || "Error al subir." });
      }
    } catch {
      setMsg({ ok: false, text: "Error de red." });
    } finally {
      setBusy(false);
    }
  }

  async function remove(url: string) {
    if (!confirm("¿Borrar esta foto?")) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const d = await res.json();
      if (res.ok) setGallery(d.gallery);
    } finally {
      setBusy(false);
    }
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= gallery.length) return;
    const next = [...gallery];
    [next[i], next[j]] = [next[j], next[i]];
    setGallery(next);
  }

  function update(i: number, patch: Partial<GalleryImage>) {
    setGallery(gallery.map((g, idx) => (idx === i ? { ...g, ...patch } : g)));
  }

  async function save() {
    if (!config) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...config, gallery }),
      });
      const d = await res.json();
      if (res.ok) {
        setConfig(d);
        setGallery(d.gallery);
        setMsg({ ok: true, text: "Cambios guardados." });
      } else {
        setMsg({ ok: false, text: d.error || "Error al guardar." });
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-bone">
          Galería
        </h1>
        <p className="mt-1 text-sm text-smoke">
          Sube fotos del servidor. Aparecerán en la galería de la web.
        </p>
      </div>

      {msg && (
        <p className={`text-sm ${msg.ok ? "text-emerald-400" : "text-red-400"}`}>{msg.text}</p>
      )}

      <Card title="Subir foto nueva">
        <form onSubmit={upload} className="space-y-4">
          <Field label="Imagen" hint="JPG, PNG, WebP o GIF · máx. 8 MB">
            <Input ref={fileRef} type="file" accept="image/*" required />
          </Field>
          <Field label="Pie de foto (opcional)">
            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Ej: Asalto al bunker de Dambog"
              maxLength={120}
            />
          </Field>
          <Button type="submit" disabled={busy}>
            {busy ? "Subiendo…" : "Subir foto"}
          </Button>
        </form>
      </Card>

      <Card
        title={`Fotos (${gallery.length})`}
        desc={
          gallery.length === 0
            ? "Aún no has subido fotos. Mientras tanto, la web muestra las imágenes por defecto."
            : "Reordena con ▲▼, marca una como destacada (ocupa 2×2) y edita su pie."
        }
      >
        {gallery.length > 0 && (
          <div className="space-y-3">
            {gallery.map((g, i) => (
              <div
                key={g.url}
                className="flex items-center gap-4 border border-ash-700 bg-ash-950 p-3"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden border border-ash-700">
                  <Image src={g.url} alt={g.caption} fill className="object-cover" sizes="96px" unoptimized />
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <Input
                    value={g.caption}
                    onChange={(e) => update(i, { caption: e.target.value })}
                    placeholder="Pie de foto"
                    maxLength={120}
                  />
                  <label className="inline-flex items-center gap-2 text-xs text-smoke">
                    <input
                      type="checkbox"
                      checked={!!g.featured}
                      onChange={(e) => update(i, { featured: e.target.checked })}
                    />
                    Destacada (grande)
                  </label>
                </div>
                <div className="flex shrink-0 flex-col gap-1">
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="px-2 text-smoke hover:text-ember disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === gallery.length - 1}
                    className="px-2 text-smoke hover:text-ember disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
                <button
                  onClick={() => remove(g.url)}
                  className="shrink-0 border border-blood/50 px-3 py-1.5 text-xs font-bold uppercase text-red-300 hover:bg-blood/20"
                >
                  Borrar
                </button>
              </div>
            ))}
            <div className="pt-2">
              <Button onClick={save} disabled={busy}>
                {busy ? "Guardando…" : "Guardar orden y pies"}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
