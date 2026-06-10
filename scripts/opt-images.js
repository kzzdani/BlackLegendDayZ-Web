// Optimiza y convierte a WebP las imágenes reales del Discord para la web.
// Uso: node scripts/opt-images.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.resolve(__dirname, "../../assets-discord");
const PUB = path.resolve(__dirname, "../public");

const jobs = [
  // --- Galería (fotos in-game / aesthetic) ---
  ["nicefoto1.png", "gallery/real-1.webp", 2400, 80],
  ["nicefoto2.png", "gallery/real-2.webp", 1920, 82],
  ["run5.png", "gallery/real-3.webp", 1600, 82],
  // --- Wiki: tier-map (infografía, más calidad) ---
  ["image.png", "wiki/tier-map.webp", 1100, 90],
  // --- Wiki: llaves / containers ---
  ["llave-roja.png", "wiki/llave-roja.webp", 1200, 82],
  ["llave-amarilla.png", "wiki/llave-amarilla.webp", 1200, 82],
  ["llave-azul.png", "wiki/llave-azul.webp", 1200, 82],
];
// --- Wiki: run (1..8) ---
for (let i = 1; i <= 8; i++) jobs.push([`run${i}.png`, `wiki/run-${i}.webp`, 1400, 80]);
// --- Wiki: crafteos (1..11, infografías con texto) ---
for (let i = 1; i <= 11; i++) jobs.push([`craft${i}.png`, `wiki/craft-${i}.webp`, 1400, 85]);

(async () => {
  for (const dir of ["gallery", "wiki"]) {
    fs.mkdirSync(path.join(PUB, dir), { recursive: true });
  }
  let totalIn = 0;
  let totalOut = 0;
  for (const [src, out, width, quality] of jobs) {
    const srcPath = path.join(SRC, src);
    const outPath = path.join(PUB, out);
    if (!fs.existsSync(srcPath)) {
      console.log("  ⚠ no existe:", src);
      continue;
    }
    const inSize = fs.statSync(srcPath).size;
    await sharp(srcPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(outPath);
    const outSize = fs.statSync(outPath).size;
    totalIn += inSize;
    totalOut += outSize;
    console.log(
      `  ✓ ${out.padEnd(24)} ${(inSize / 1024 / 1024).toFixed(1)}MB → ${(outSize / 1024).toFixed(0)}KB`,
    );
  }
  console.log(
    `\n  Total: ${(totalIn / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB`,
  );
})();
