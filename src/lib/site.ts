// =============================================================================
// BLACK LEGEND DAYZ — Configuración central de contenido (single source of truth)
// -----------------------------------------------------------------------------
// Datos REALES extraídos del Discord oficial (run de Livonia, llaves, normativa…).
// Lo marcado con PLACEHOLDER sigue pendiente de confirmar con Jaro (owner).
// =============================================================================

export const PLACEHOLDER = "__PLACEHOLDER__";

export const site = {
  name: "Black Legend",
  fullName: "Black Legend DayZ",
  tagline: "El servidor que te llevará a una experiencia única en DayZ",
  shortPitch:
    "Servidor hispano de DayZ en Livonia. Vanilla+ en primera persona, 100% PvP, con una Run end-game única, sistema de llaves y una comunidad que no se rinde.",
  domain: "blacklegenddayz.com", // dominio que se comprará en Vercel
  // ---- Conexión al servidor (DATOS REALES) --------------------------------
  server: {
    title: "Black Legend Vanilla+ 1PP",
    ip: "5.196.92.130",
    port: "2302",
    slots: "70",
    currentMap: "Livonia",
    perspective: "1PP", // solo primera persona
    wipe: "Wipes periódicos",
    battlemetricsId: "38441271", // para el contador de jugadores en vivo
  },
  // ---- Comunidad / Redes ---------------------------------------------------
  social: {
    discord: "https://discord.gg/c3EFQvyDA",
    discordInvite: "c3EFQvyDA", // código para contar miembros/online en vivo
    youtube: "https://www.youtube.com/@blacklegenddayz",
    vote: "https://es.top-games.net/dayz/vote/black-legend-livonia-vanilla-1pp",
    oldSite: "https://blacklegenddayz.wixsite.com/blacklegend",
  },
  // ---- Multimedia ----------------------------------------------------------
  media: {
    // ID del vídeo de YouTube para el trailer (p.ej. "dQw4w9WgXcQ").
    // Pendiente de Jaro: pega aquí el ID y se incrusta automáticamente.
    trailerId: "",
  },
} as const;

// ---- Mapa actual: LIVONIA ---------------------------------------------------
export const livonia = {
  name: "Livonia",
  size: "163 km²",
  climate: "Templado · bosques densos",
  description:
    "El mapa actual de Black Legend. Más compacto que Chernarus, con pueblos pequeños y juntos: la interacción y el PvP están asegurados. Mucho bosque para esconder tu base… o para emboscar.",
  highlights: [
    "Mapa compacto enfocado al combate",
    "Pueblos cercanos = más interacción",
    "Bunker y Run end-game exclusivos",
    "Zonas contaminadas de alto riesgo / alto loot",
  ],
} as const;

// ---- Tier-map (zonas de loot) -----------------------------------------------
export const tiers = [
  {
    n: 1,
    name: "Tier 1",
    zone: "Norte",
    color: "#7ea24b",
    text: "Zona de inicio. Loot básico para equiparte y empezar a sobrevivir.",
  },
  {
    n: 2,
    name: "Tier 2",
    zone: "Centro",
    color: "#5b8fb0",
    text: "Equipo intermedio y armas decentes. Más tránsito de jugadores, más peligro.",
  },
  {
    n: 3,
    name: "Tier 3",
    zone: "Sur",
    color: "#9b6fb0",
    text: "El mejor loot militar del mapa. Incluye zonas contaminadas: necesitas traje NBQ y nervios de acero.",
  },
] as const;

// ---- Características del servidor (REALES) -----------------------------------
export const features = [
  {
    icon: "skull",
    title: "Vanilla+ · 1PP",
    text: "Experiencia vanilla mejorada en primera persona. Sin pay-to-win: aquí ganas por habilidad.",
  },
  {
    icon: "flame",
    title: "100% PvP",
    text: "Livonia es un mapa compacto donde el combate está asegurado. Si buscas acción, la tienes.",
  },
  {
    icon: "map",
    title: "La Run de Livonia",
    text: "Un end-game único: bunkers, tarjetas de acceso y armas exclusivas (AWM, GALIL, M79).",
  },
  {
    icon: "shield",
    title: "Anticheat activo",
    text: "VPPAdminTools y un staff vigilando 24/7. Cheats o abuso de bugs = ban permanente.",
  },
  {
    icon: "users",
    title: "Comunidad hispana",
    text: "Cientos de supervivientes en Discord. Clanes, alianzas, traiciones… y buen rollo.",
  },
  {
    icon: "bolt",
    title: "Base-building mejorado",
    text: "Addon de construcción, Building Fortifications y MMG Base Storage para bases con criterio.",
  },
] as const;

// ---- Mods / configuración (REAL) --------------------------------------------
export const mods = [
  "BlackLegendCore",
  "Building Fortifications",
  "MMG Base Storage",
  "Code Lock",
  "VPPAdminTools",
  "CF",
] as const;

// ---- Eventos / contenido (REAL) ---------------------------------------------
export const events = [
  {
    name: "Wipe + Livonia",
    tag: "Mapa actual",
    description:
      "El servidor migró a Livonia: mapa más pequeño y 100% PvP. Cada wipe es empezar de cero y reescribir tu leyenda.",
  },
  {
    name: "Concurso de bases",
    tag: "Evento",
    description:
      "Presenta tu base por ticket. Las 3 mejores consiguen color de TAG personalizado en el chat. Se valora estética y construcción.",
  },
  {
    name: "La Run de Livonia",
    tag: "End-game",
    description:
      "Llega al bunker final con la tarjeta perforada y la tarjeta blanca para conseguir las armas más codiciadas del servidor.",
  },
] as const;

// ---- Sistema de llaves (REAL) -----------------------------------------------
export const keys = [
  {
    id: "roja",
    color: "#c0392b",
    name: "Llave Roja",
    opens: "Container rojo (cerca de hospitales)",
    loot: "Loot y storage médico",
    source: "Inventario de zombies médicos",
  },
  {
    id: "amarilla",
    color: "#d4a017",
    name: "Llave Amarilla",
    opens: "Container amarillo (zonas industriales de Nadbor y Topolin)",
    loot: "Storage de bases variado",
    source: "Inventario de zombies industriales",
  },
  {
    id: "azul",
    color: "#2e6fb0",
    name: "Llave Azul",
    opens: "Container azul (Airfield)",
    loot: "Items necesarios para la Run de Livonia",
    source: "Dentro del maletín del bunker de Dambog",
  },
] as const;

// ---- La Run de Livonia, paso a paso (REAL) ----------------------------------
export const runReward = ["AWM (sniper)", "GALIL (fusil de asalto)", "M79 (lanzagranadas)"] as const;

export const runSteps = [
  {
    n: 1,
    title: "Consigue la llave del maletín",
    text: "Se obtiene looteando el inventario de los zombies oficiales. Tiene un porcentaje de drop bajo, así que arma paciencia.",
  },
  {
    n: 2,
    title: "Encuentra el maletín",
    text: "El maletín siempre aparece en el bunker de Dambog, al suroeste del mapa.",
  },
  {
    n: 3,
    title: "Entra al bunker de Dambog",
    text: "Necesitas la tarjeta perforada que se consigue en la zona contaminada de Radunin. Esta tarjeta tiene dos usos.",
  },
  {
    n: 4,
    title: "Abre el container Azul",
    text: "El maletín te da la llave del container azul (en el Airfield). Dentro encontrarás un osito con la tarjeta blanca y el calentador.",
  },
  {
    n: 5,
    title: "Llega al bunker final",
    text: "Está en la mina de Livonia. Para acceder necesitas la tarjeta perforada y la tarjeta de acceso blanca.",
  },
  {
    n: 6,
    title: "Arranca el generador",
    text: "Dentro, busca la sala del generador. Repóstalo con gasoil, introdúcele el calentador y arráncalo.",
  },
  {
    n: 7,
    title: "Abre la sala de misiles",
    text: "Junto al generador hay un cuadro de palancas (A1-A4) que abre y cierra las compuertas de las salas de misiles. En una de ellas están las armas de la Run.",
  },
] as const;

// ---- Crafteos destacados (REAL) ---------------------------------------------
export const crafts = [
  {
    name: "Empalizada",
    text: "Defensa perimetral básica para proteger tu base de miradas y accesos no deseados.",
  },
  {
    name: "Fortificación",
    text: "Estructura defensiva avanzada para aguantar los raideos. Súbela de nivel y resiste.",
  },
] as const;

// ---- Reglas (NORMATIVA REAL del Discord) ------------------------------------
export const ruleGroups = [
  {
    title: "Reglas generales",
    rules: [
      "Usar cheats o abusar de bugs/exploits = BAN PERMANENTE.",
      "No ofrecemos compensación por la pérdida de tu vida, equipo o vehículo.",
      "El uso de vehículos es bajo tu propia responsabilidad. No se ofrece soporte a vehículos.",
      "El stream sniping está prohibido: BAN PERMANENTE si hay evidencia.",
      "Prohibido el uso de multicuentas.",
      "Prohibido el combat login.",
    ],
  },
  {
    title: "Reglas durante el raideo",
    rules: [
      "No puedes cerrar sesión dentro de una base que acabas de raidear: termina el raideo y abandona la base.",
      "Una base sin codelock más de 3 días se considera base abandonada.",
      "Está estrictamente prohibido colocar codelocks en una base raideada.",
      "Boostearse entre jugadores está permitido; usar hogueras para boostearse NO está permitido.",
      "Prohibido desmontar estructuras de otras bases fuera del horario de raid.",
    ],
  },
  {
    title: "Reglas de construcción",
    rules: [
      "No apilar vallas, puertas ni torres (debe haber espacio suficiente para que pase un jugador).",
      "No construir bases imposibles de raidear (bloqueando accesos con postes u otros objetos).",
      "Prohibido construir torres de más de 3 pisos.",
    ],
  },
  {
    title: "Convivencia",
    rules: [
      "Respeto entre jugadores y hacia el staff, dentro y fuera del juego.",
      "Prohibido el racismo, los insultos y cualquier acto de vejación: puede suponer ban permanente.",
      "Prohibido el SPAM de otros servidores en los canales o por MD a miembros.",
    ],
  },
] as const;

// ---- Horario de raid (REAL, UTC+2) ------------------------------------------
export const raidSchedule = [
  { day: "Lunes", hours: "18:00 – 00:00" },
  { day: "Martes", hours: "18:00 – 00:00" },
  { day: "Miércoles", hours: "18:00 – 00:00" },
  { day: "Jueves", hours: "18:00 – 00:00" },
  { day: "Viernes", hours: "18:00 – 00:00" },
  { day: "Sábado", hours: "16:00 – 00:00" },
  { day: "Domingo", hours: "16:00 – 00:00" },
] as const;

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/acerca", label: "El servidor" },
  { href: "/donaciones", label: "Donaciones" },
  { href: "/reglas", label: "Reglas" },
  { href: "/wiki", label: "Wiki" },
] as const;
