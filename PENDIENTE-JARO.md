# 📋 Datos pendientes de Jaro

Estos son los datos reales que faltan para terminar la web. Todo lo demás ya
está montado y funcionando con textos provisionales. En cuanto Jaro pase esta
info, se actualiza en **un solo archivo**: [`src/lib/site.ts`](src/lib/site.ts).

> Los valores provisionales aparecen en la web marcados (precios como `··€`,
> cifras como `··`, IP como "Disponible en Discord", avisos en gris).

## 🔌 Conexión al servidor — `site.server`
- [ ] **IP / dominio de conexión** (ej. `play.blacklegenddayz.com`)
- [ ] **Puerto** (ej. `2302`)
- [ ] **Nº de slots** (ej. `60`)
- [ ] **Mapa actual** en rotación (ya puesto: Sakhal — confirmar)

## 💰 Donaciones — `donationTiers`
- [ ] **Precio** de cada pack (Superviviente / Legionario / Leyenda)
- [ ] **Recompensas reales** de cada pack (ahora hay una propuesta)
- [ ] **Método de pago** (PayPal, Tebex, etc.) — ahora apunta al Discord

## 🧩 El servidor — `src/app/acerca/page.tsx` y `site.ts`
- [ ] **Lista de mods** activos (+ guía de instalación si la hay)
- [ ] **Nº de mods** para la cifra de "Mods activos"
- [ ] **Equipo / Staff**: nombres, roles y (opcional) avatares
- [ ] Revisar el texto del "manifiesto" / historia del servidor

## 📜 Reglas — `ruleGroups`
- [ ] **Revisar y ajustar** las reglas (ahora hay una base genérica de DayZ)

## 📚 Wiki — `wikiSections`
- [ ] **Contenido real** de los artículos (ahora solo están los títulos)

## 🖼️ Multimedia (opcional, mejora visual)
- [ ] **Capturas/screenshots** reales del servidor (mapas, bases, eventos)
- [ ] **Vídeos/trailers** (Frostline, Gulag) para incrustar
- [ ] Confirmar **redes**: Discord ✅ · YouTube ✅ · ¿TikTok/Instagram/Twitch?

## 🌐 Dominio
- [ ] Confirmar dominio final (provisional: `blacklegenddayz.com`) para
      comprarlo en Vercel y actualizar `site.domain`.
