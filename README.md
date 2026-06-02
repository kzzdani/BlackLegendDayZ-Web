# 🔥 Black Legend DayZ — Web oficial

Web del servidor de DayZ **Black Legend**. Diseño post-apocalíptico con
storytelling, scroll cinematográfico y la estética del fénix de fuego sobre un
mundo de ceniza.

**Concepto:** _"Renace de las cenizas"_ — mundo frío y desolado, el fénix como
único foco cálido.

## 🧱 Stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** — sistema de diseño en `globals.css`
- **[Framer Motion](https://www.framer.com/motion/)** — animaciones y scroll storytelling
- **[Lenis](https://lenis.darkroom.engineering/)** — smooth scroll
- **[GSAP](https://gsap.com)** — disponible para animaciones avanzadas
- Tipografías: _Saira Condensed_ (display) · _Chakra Petch_ (texto) · _Saira Stencil_ (acentos)

## 🚀 Desarrollo

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo → http://localhost:3000
npm run build    # build de producción
npm run start    # servir la build
```

## ✏️ Editar el contenido

Casi todo el texto y los datos viven en **un único archivo**:

### [`src/lib/site.ts`](src/lib/site.ts)
Nombre, tagline, redes, IP del servidor, mapas, características, eventos, packs de
donación, reglas y secciones de la wiki. Cambia aquí y se actualiza en toda la web.

Los datos que faltan están marcados con `PLACEHOLDER` y listados en
**[`PENDIENTE-JARO.md`](PENDIENTE-JARO.md)**.

## 📂 Estructura

```
src/
├── app/                    # páginas (rutas)
│   ├── page.tsx            # Inicio (landing con storytelling)
│   ├── acerca/             # El servidor
│   ├── donaciones/         # Donaciones
│   ├── reglas/             # Reglas
│   ├── wiki/               # Wiki
│   ├── layout.tsx          # layout raíz (fuentes, navbar, footer, SEO)
│   └── globals.css         # sistema de diseño (colores, utilidades, animaciones)
├── components/
│   ├── sections/           # secciones de la landing (Hero, Story, Maps...)
│   ├── Navbar / Footer / SmoothScroll / Embers / GrainOverlay / Reveal ...
│   └── ui.tsx              # primitivas (Button, Container, Heading...)
└── lib/
    ├── site.ts             # ⭐ contenido central
    └── utils.ts
public/brand/               # logos y fondos de Black Legend
```

## ☁️ Despliegue en Vercel

1. Sube este repo a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.
3. Framework: **Next.js** (detección automática). No hace falta configurar nada más.
4. **Deploy**. Cada `git push` a `main` despliega automáticamente.
5. Compra/conecta el dominio en **Settings → Domains** y actualiza
   `site.domain` en `src/lib/site.ts`.

---

_No afiliado con Bohemia Interactive. DayZ es marca de sus respectivos propietarios._
