// =============================================================================
// BLACK LEGEND DAYZ — Configuración central de contenido (single source of truth)
// -----------------------------------------------------------------------------
// Los valores marcados con PLACEHOLDER hay que pedírselos a Jaro (owner).
// Cambia aquí y se actualiza en toda la web.
// =============================================================================

export const PLACEHOLDER = "__PLACEHOLDER__";

export const site = {
  name: "Black Legend",
  fullName: "Black Legend DayZ",
  tagline: "El servidor que te llevará a una experiencia única en DayZ",
  shortPitch:
    "Sobrevive, conquista y renace. Un servidor hispano de DayZ con eventos únicos, mapas rotativos y una comunidad que no se rinde.",
  domain: "blacklegenddayz.com", // dominio que se comprará en Vercel
  // ---- Conexión al servidor (PEDIR A JARO) --------------------------------
  server: {
    ip: PLACEHOLDER, // p.ej. "play.blacklegenddayz.com"
    port: PLACEHOLDER, // p.ej. "2302"
    slots: PLACEHOLDER, // p.ej. "60"
    currentMap: "Sakhal", // Frostline
  },
  // ---- Comunidad / Redes ---------------------------------------------------
  social: {
    discord: "https://discord.gg/7YQ3HJK2tn",
    youtube: "https://www.youtube.com/@blacklegenddayz",
    oldSite: "https://blacklegenddayz.wixsite.com/blacklegend",
  },
} as const;

// ---- Mapas en rotación ------------------------------------------------------
export const maps = [
  {
    id: "chernarus",
    name: "Chernarus",
    flavor: "Vanilla",
    description:
      "El clásico que lo empezó todo. 225 km² de la ex-república soviética: bosques, ciudades industriales y costa. Pura supervivencia sin concesiones.",
    climate: "Templado",
    accent: "#7ea24b",
  },
  {
    id: "sakhal",
    name: "Sakhal",
    flavor: "Frostline",
    description:
      "El archipiélago volcánico y helado del DLC Frostline. El frío mata tan rápido como las balas. Gestiona tu temperatura o muere congelado.",
    climate: "Ártico",
    accent: "#76b6cc",
  },
  {
    id: "bitterroot",
    name: "Bitterroot",
    flavor: "Custom",
    description:
      "Montañas, valles densos y pueblos aislados. Un mapa custom de combate vertical donde cada cresta esconde un francotirador.",
    climate: "Montañoso",
    accent: "#c98a4b",
  },
] as const;

// ---- Características del servidor --------------------------------------------
export const features = [
  {
    icon: "skull",
    title: "Hardcore pero justo",
    text: "Loot equilibrado, economía viva y zombies que de verdad dan miedo. Sin pay-to-win.",
  },
  {
    icon: "flame",
    title: "Eventos en vivo",
    text: "Gulag Series, drops aéreos, asedios a bases y eventos de staff con recompensas únicas.",
  },
  {
    icon: "map",
    title: "Mapas rotativos",
    text: "Chernarus, Sakhal y Bitterroot. La experiencia nunca se queda estancada.",
  },
  {
    icon: "shield",
    title: "Anticheat activo",
    text: "Staff y herramientas anti-cheat vigilando 24/7 para que ganes por habilidad, no por trampas.",
  },
  {
    icon: "users",
    title: "Comunidad hispana",
    text: "Cientos de supervivientes en Discord. Clanes, alianzas, traiciones... y buen rollo.",
  },
  {
    icon: "bolt",
    title: "Rendimiento sólido",
    text: "Servidor optimizado y estable para que el único lag sea el de tus reflejos.",
  },
] as const;

// ---- Eventos / Storytelling -------------------------------------------------
export const events = [
  {
    name: "Gulag Series",
    tag: "Evento estrella",
    description:
      "Cae preso, lucha por tu libertad en la arena y vuelve al mapa con la gloria — o muere en el intento.",
  },
  {
    name: "Frostline Trailer",
    tag: "Sakhal",
    description:
      "El estreno del mapa helado de Sakhal. Una nueva forma de morir: el frío.",
  },
  {
    name: "Drops aéreos",
    tag: "Semanal",
    description: "Loot de alto valor caído del cielo. El que llega primero, manda.",
  },
] as const;

// ---- Donaciones (PACKS POR CONFIRMAR CON JARO) ------------------------------
// Estos packs son una propuesta/placeholder. Jaro define precios y contenido real.
export const donationTiers = [
  {
    id: "superviviente",
    name: "Superviviente",
    price: PLACEHOLDER, // p.ej. "5€"
    period: "único",
    highlight: false,
    perks: [
      "Rol exclusivo en Discord",
      "Color de nombre personalizado",
      "Acceso al canal de donadores",
      "Nuestro eterno agradecimiento",
    ],
  },
  {
    id: "legionario",
    name: "Legionario",
    price: PLACEHOLDER, // p.ej. "12€"
    period: "único",
    highlight: true,
    perks: [
      "Todo lo del pack Superviviente",
      "Kit de inicio mejorado",
      "Prioridad en cola de entrada",
      "Skin/etiqueta exclusiva en el juego",
    ],
  },
  {
    id: "leyenda",
    name: "Leyenda",
    price: PLACEHOLDER, // p.ej. "25€"
    period: "único",
    highlight: false,
    perks: [
      "Todo lo del pack Legionario",
      "Rol VIP permanente",
      "Acceso anticipado a eventos",
      "Voz en las decisiones de la comunidad",
    ],
  },
] as const;

// ---- Reglas (BASE GENÉRICA — JARO REVISA Y AJUSTA) --------------------------
export const ruleGroups = [
  {
    title: "Convivencia",
    rules: [
      "Respeto absoluto entre jugadores y hacia el staff dentro y fuera del juego.",
      "Prohibido el racismo, la xenofobia, la apología y cualquier discurso de odio.",
      "Nada de spam, publicidad de otros servidores ni flood en los canales.",
    ],
  },
  {
    title: "Juego limpio",
    rules: [
      "Cero tolerancia con cheats, hacks, glitches o exploits de cualquier tipo.",
      "Prohibido el ghosting, combat logging y el uso de cuentas alternativas.",
      "El stream sniping y el metagaming serán sancionados.",
    ],
  },
  {
    title: "Bases y construcción",
    rules: [
      "Respeta los límites de construcción y las zonas protegidas del mapa.",
      "Prohibido bloquear loots de servidor o zonas de evento con estructuras.",
      "El raideo está permitido según las normas vigentes del Discord.",
    ],
  },
  {
    title: "Sanciones",
    rules: [
      "Las sanciones van desde el aviso hasta el ban permanente según gravedad.",
      "El staff tiene la última palabra; las apelaciones se gestionan por ticket.",
      "Desconocer las reglas no exime de su cumplimiento.",
    ],
  },
] as const;

// ---- Wiki (ESTRUCTURA INICIAL — SE AMPLÍA CON JARO) -------------------------
export const wikiSections = [
  {
    id: "primeros-pasos",
    title: "Primeros pasos",
    summary: "Cómo conectarte, mods necesarios y tus primeros minutos vivo.",
    articles: ["Cómo conectarse", "Instalar los mods", "Guía del novato"],
  },
  {
    id: "supervivencia",
    title: "Supervivencia",
    summary: "Temperatura, enfermedades, comida y agua. Lo básico para no morir.",
    articles: ["Gestión del frío en Sakhal", "Enfermedades y curas", "Hambre y sed"],
  },
  {
    id: "loot-armas",
    title: "Loot y armas",
    summary: "Dónde encontrar el mejor equipo y cómo funciona la economía.",
    articles: ["Zonas de loot militar", "Tier list de armas", "Economía del servidor"],
  },
  {
    id: "bases",
    title: "Bases y vehículos",
    summary: "Construcción, defensa de bases y mecánicas de vehículos.",
    articles: ["Construir tu primera base", "Vehículos y reparación", "Defensa anti-raid"],
  },
] as const;

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/acerca", label: "El servidor" },
  { href: "/donaciones", label: "Donaciones" },
  { href: "/reglas", label: "Reglas" },
  { href: "/wiki", label: "Wiki" },
] as const;
