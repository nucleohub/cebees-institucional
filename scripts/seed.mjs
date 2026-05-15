/**
 * Seed Script — popula o Sanity CMS com todos os dados estáticos do site.
 * Uso: node scripts/seed.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ── Lê .env.local ──────────────────────────────────────────── */
const envPath = path.join(__dirname, "..", ".env.local");
const env = fs
  .readFileSync(envPath, "utf8")
  .split("\n")
  .reduce((acc, line) => {
    const idx = line.indexOf("=");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      acc[key] = val;
    }
    return acc;
  }, {});

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

/* ── Upload de imagem a partir de URL ───────────────────────── */
async function uploadImage(url, filename) {
  try {
    process.stdout.write(`  📥 Baixando imagem: ${filename}... `);
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Sanity Seed)" },
    });
    if (!res.ok) {
      console.log(`⚠️  HTTP ${res.status} — pulando imagem`);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType: "image/png",
    });
    console.log(`✓ asset ${asset._id}`);
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (err) {
    console.log(`⚠️  ${err.message} — pulando imagem`);
    return null;
  }
}

/* ── Dados dos Cursos Livres ────────────────────────────────── */
const cursosData = [
  {
    _id: "curso-base-do-treinamento",
    titulo: "Base do Treinamento",
    slug: "base-do-treinamento",
    descricao:
      "Fundamentos científicos do treinamento de força, periodização e metodologias para evolução consistente.",
    categoria: "Treinamento",
    modalidade: "Online",
    cargaHoraria: "40h",
    inscricoesAbertas: true,
    destaque: true,
    imagemUrl:
      "https://cebees.com.br/wp-content/uploads/2026/03/PACK-1-BASE-DO-TREINAMENTO-1.png",
    imagemFilename: "PACK-1-BASE-DO-TREINAMENTO.png",
  },
  {
    _id: "curso-fisiculturismo-da-teoria-ao-palco",
    titulo: "Fisiculturismo: da teoria ao palco",
    slug: "fisiculturismo-da-teoria-ao-palco",
    descricao:
      "Do treinamento à apresentação em palco — tudo sobre fisiculturismo com referências nacionais.",
    categoria: "Fisiculturismo",
    modalidade: "Online",
    cargaHoraria: "28h",
    inscricoesAbertas: true,
    destaque: true,
    imagemUrl:
      "https://cebees.com.br/wp-content/uploads/2026/03/PACK-2-FISICULTURISMO-DA-TEORIA-AO-PALCO-1.png",
    imagemFilename: "PACK-2-FISICULTURISMO.png",
  },
  {
    _id: "curso-performance",
    titulo: "Performance",
    slug: "performance",
    descricao:
      "Estratégias avançadas de performance: recuperação, periodização e pico de rendimento.",
    categoria: "Treinamento",
    modalidade: "Online",
    cargaHoraria: "30h",
    inscricoesAbertas: true,
    destaque: false,
    imagemUrl:
      "https://cebees.com.br/wp-content/uploads/2026/03/PACK-3-PERFORMANCE-1.png",
    imagemFilename: "PACK-3-PERFORMANCE.png",
  },
  {
    _id: "curso-mente-do-campeao",
    titulo: "Mente do Campeão",
    slug: "mente-do-campeao",
    descricao:
      "Psicologia do esporte e mentalidade vencedora para resultados de alto nível.",
    categoria: "Treinamento",
    modalidade: "Online",
    cargaHoraria: "20h",
    inscricoesAbertas: true,
    destaque: false,
    imagemUrl:
      "https://cebees.com.br/wp-content/uploads/2026/03/PACK-4-MENTE-DO-CAMPEAO-1.png",
    imagemFilename: "PACK-4-MENTE-DO-CAMPEAO.png",
  },
  {
    _id: "curso-farmacologia-e-suplementacao",
    titulo: "Farmacologia e Suplementação",
    slug: "farmacologia-e-suplementacao",
    descricao:
      "Guia completo sobre suplementos e farmacologia esportiva com base científica.",
    categoria: "Saúde",
    modalidade: "Online",
    cargaHoraria: "35h",
    inscricoesAbertas: true,
    destaque: false,
    imagemUrl:
      "https://cebees.com.br/wp-content/uploads/2026/03/PACK-5-FARMACOLOGIA-E-SUPLEMENTACAO-1.png",
    imagemFilename: "PACK-5-FARMACOLOGIA.png",
  },
  {
    _id: "curso-nutricao-e-bioquimica",
    titulo: "Nutrição e Bioquímica",
    slug: "nutricao-e-bioquimica",
    descricao:
      "Nutrição esportiva e bioquímica metabólica para otimização do desempenho.",
    categoria: "Saúde",
    modalidade: "Online",
    cargaHoraria: "40h",
    inscricoesAbertas: true,
    destaque: true,
    imagemUrl:
      "https://cebees.com.br/wp-content/uploads/2026/03/PACK-6-NUTRICAO-E-BIOQUIMICA-1.png",
    imagemFilename: "PACK-6-NUTRICAO.png",
  },
  {
    _id: "curso-fisiologia-completa",
    titulo: "Fisiologia Completa",
    slug: "fisiologia-completa",
    descricao:
      "Fisiologia do exercício aplicada — mecanismos corporais que regem a atividade física.",
    categoria: "Saúde",
    modalidade: "Online",
    cargaHoraria: "50h",
    inscricoesAbertas: true,
    destaque: false,
    imagemUrl:
      "https://cebees.com.br/wp-content/uploads/2026/03/PACK-7-FISIOLOGIA-COMPLETA-1.png",
    imagemFilename: "PACK-7-FISIOLOGIA.png",
  },
  {
    _id: "curso-empreendedor-fitness",
    titulo: "Empreendedor Fitness",
    slug: "empreendedor-fitness",
    descricao:
      "Como empreender no mercado fitness: gestão, marketing, vendas e negócios.",
    categoria: "Carreiras",
    modalidade: "Online",
    cargaHoraria: "25h",
    inscricoesAbertas: true,
    destaque: true,
    imagemUrl:
      "https://cebees.com.br/wp-content/uploads/2026/03/PACK-8-EMPREENDEDOR-FITNESS-1.png",
    imagemFilename: "PACK-8-EMPREENDEDOR-FITNESS.png",
  },
];

/* ── Banner padrão ──────────────────────────────────────────── */
const bannerData = {
  _id: "banner-principal-default",
  titulo: "Desenvolva seu conhecimento com conteúdo prático.",
  subtitulo:
    "Formação profissional nas áreas do esporte, atividade física e saúde — cursos livres, tecnólogo e pós-graduação.",
  ctaPrimario: { label: "Ver Cursos Livres", url: "/cursos-livres" },
  ctaSecundario: {
    label: "Acessar Plataforma",
    url: "https://cebees.memberclass.com.br/",
  },
  ativo: true,
  tipoCurso: "Nenhum",
};

/* ── Site Config ────────────────────────────────────────────── */
const siteConfigData = {
  _id: "siteConfig",
  nomeInstituicao: "CEBEES",
  email: "cbmf.cursos@gmail.com",
  instagram: "https://www.instagram.com/cebees_edu",
  linkedin: "https://www.linkedin.com/company/cebees",
};

/* ── Página Sobre ───────────────────────────────────────────── */
const paginaSobreData = {
  _id: "paginaSobre",
  missao:
    "Promover a formação profissional de qualidade nas áreas do esporte, atividade física e saúde, capacitando profissionais com conhecimento científico e habilidades práticas para transformar vidas.",
  visao:
    "Ser referência nacional em educação esportiva e saúde, reconhecida pela excelência acadêmica, inovação pedagógica e impacto positivo na carreira dos profissionais formados.",
  valores: [
    "Excelência acadêmica",
    "Evidência científica",
    "Formação prática",
    "Inovação pedagógica",
    "Ética profissional",
    "Impacto social",
  ],
};

/* ── Execução ───────────────────────────────────────────────── */
async function run() {
  console.log("🚀 Iniciando seed do Sanity CMS...\n");
  console.log(
    `📡 Projeto: ${env.NEXT_PUBLIC_SANITY_PROJECT_ID} / ${env.NEXT_PUBLIC_SANITY_DATASET}\n`
  );

  /* 1. Cursos Livres */
  console.log("📚 Criando Cursos Livres...");
  for (const curso of cursosData) {
    const imagem = await uploadImage(curso.imagemUrl, curso.imagemFilename);

    const doc = {
      _type: "cursoLivre",
      _id: curso._id,
      titulo: curso.titulo,
      slug: { _type: "slug", current: curso.slug },
      descricao: curso.descricao,
      categoria: curso.categoria,
      modalidade: curso.modalidade,
      cargaHoraria: curso.cargaHoraria,
      inscricoesAbertas: curso.inscricoesAbertas,
      destaque: curso.destaque,
      linkInscricao: "https://cebees.memberclass.com.br/",
      ...(imagem ? { imagem } : {}),
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ ${curso.titulo}\n`);
  }

  /* 2. Banner */
  console.log("🎠 Criando Banner Principal...");
  await client.createOrReplace({
    _type: "bannerConfig",
    ...bannerData,
  });
  console.log("  ✓ Banner padrão criado\n");

  /* 3. Site Config */
  console.log("⚙️  Criando Configurações do Site...");
  await client.createOrReplace({
    _type: "siteConfig",
    ...siteConfigData,
  });
  console.log("  ✓ Site config criado\n");

  /* 4. Página Sobre */
  console.log("🏛️  Criando Página Sobre...");
  await client.createOrReplace({
    _type: "paginaSobre",
    ...paginaSobreData,
  });
  console.log("  ✓ Página Sobre criada\n");

  console.log("✅ Seed concluído com sucesso!");
  console.log("   Acesse http://localhost:3000/studio para revisar o conteúdo.");
}

run().catch((err) => {
  console.error("\n❌ Erro no seed:", err.message);
  process.exit(1);
});
