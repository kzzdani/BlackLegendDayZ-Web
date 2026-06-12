# 📋 Estado del contenido

Casi todo está ya con **datos reales** sacados del Discord (Livonia, IP, mods,
normativa, run, llaves, tier-map). Lo editable vive en
[`src/lib/site.ts`](src/lib/site.ts).

## ✅ Ya actualizado con datos reales
- Conexión: `5.196.92.130:2302` · Vanilla+ 1PP · 70 slots · **Livonia**
- Mods reales (BlackLegendCore, Building Fortifications, MMG Base Storage…)
- Normativa completa (general, raideo, construcción, convivencia) + horario de raid
- Wiki: tier-map, sistema de llaves y la Run de Livonia paso a paso
- Enlace de votación (Top-Games)

## ⏳ Pendiente de Jaro

### 1. Imágenes reales (lo más importante ahora)
La galería y la wiki usan **capturas de DayZ de Steam** como relleno. Para
sustituirlas, necesito los **archivos de imagen** (no la captura del Discord):
- [ ] **Tier-map** de Livonia (la infografía con las zonas 1/2/3)
- [ ] Capturas de la **Run de Livonia** (bunker de Dambog, generador, sala de palancas, osito, mina…)
- [ ] Fotos de los **containers / llaves**
- [ ] Fotos de **bases** y crafteos (empalizada, fortificación)
- [ ] Alguna captura PvP / del servidor para el hero y la galería

> Pásamelas como archivos (PNG/JPG) y las coloco en `public/gallery/` y en la wiki.

### 2. Otros
- [ ] **Trailer de YouTube**: pásame el enlace/ID del vídeo y se incrusta en la
      sección "El servidor en movimiento" (`site.media.trailerId`). Ahora lleva al canal.
- [ ] **Dominio** final para comprarlo en Vercel y actualizar `site.domain`
      (de momento se usa la URL de Vercel).
- [ ] (Opcional) **Método de pago** para donaciones: ahora la página de
      donaciones apunta al Discord. Si en el futuro hay PayPal/Tebex, se añade.

## ✅ Decisiones cerradas
- Discord oficial: `discord.gg/c3EFQvyDA`.
- Donaciones: voluntarias, **sin packs ni recompensas** (no pay-to-win).
- **Sin** sección de staff en la web (por decisión del cliente).
