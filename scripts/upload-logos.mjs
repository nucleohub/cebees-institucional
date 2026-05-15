/**
 * Faz upload das logos locais para o Sanity e atualiza o siteConfig.
 *
 * Antes de rodar, salve os arquivos em public/:
 *   public/logo-cebees-cor.png      → logo horizontal colorida (Image 1)
 *   public/favicon-cebees.png       → escudo / ícone            (Image 2)
 *   public/simbolo-cebees.png       → símbolo / monograma       (Image 3)
 *   public/logo-cebees-vertical.png → logo vertical             (Image 4)
 *
 * Uso: node scripts/upload-logos.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

// Lê .env.local
const envPath = path.join(root, ".env.local");
const env = fs.readFileSync(envPath, "utf8").split("\n").reduce((acc, line) => {
  const idx = line.indexOf("=");
  if (idx > 0) acc[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  return acc;
}, {});

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

/** Upload de arquivo local para o Sanity Media Library */
async function uploadLocal(filename, label) {
  const filePath = path.join(root, "public", filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  Arquivo não encontrado: public/${filename} — pulando`);
    return null;
  }
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/png",
  });
  console.log(`  ✓ ${label} → ${asset._id}`);
  return asset._id;
}

async function run() {
  console.log("🖼️  Fazendo upload das logos da CEBEES para o Sanity...\n");

  const [logoId, iconeId, simboloId, verticalId] = await Promise.all([
    uploadLocal("logo-cebees-cor.png",       "Logo horizontal colorida"),
    uploadLocal("favicon-cebees.png",         "Ícone / Escudo"),
    uploadLocal("simbolo-cebees.png",         "Símbolo / Monograma"),
    uploadLocal("logo-cebees-vertical.png",   "Logo vertical"),
  ]);

  console.log("\n📝 Atualizando siteConfig no Sanity...");

  const patch = client.patch("siteConfig");

  if (logoId)
    patch.set({ logo: { _type: "image", asset: { _type: "reference", _ref: logoId } } });
  if (iconeId)
    patch.set({ logoIcone: { _type: "image", asset: { _type: "reference", _ref: iconeId } } });
  if (simboloId)
    patch.set({ logoSimbolo: { _type: "image", asset: { _type: "reference", _ref: simboloId } } });
  if (verticalId)
    patch.set({ logoVertical: { _type: "image", asset: { _type: "reference", _ref: verticalId } } });

  await patch.commit();

  console.log("  ✓ siteConfig atualizado\n");
  console.log("✅ Logos configuradas com sucesso!");
  console.log("\nℹ️  Reinicie o servidor (npm run dev) para ver as mudanças.");
}

run().catch((err) => {
  console.error("\n❌ Erro:", err.message);
  process.exit(1);
});
