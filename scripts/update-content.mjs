/**
 * Atualiza conteúdo institucional no Sanity com dados da documentação oficial.
 * Uso: node scripts/update-content.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env.local");
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

async function run() {
  console.log("📝 Atualizando conteúdo institucional no Sanity...\n");

  /* ── Página Sobre ── */
  console.log("🏛️  Atualizando Página Sobre (Missão, Visão, Valores)...");
  await client.createOrReplace({
    _type: "paginaSobre",
    _id: "paginaSobre",
    missao:
      "Promover educação especializada em saúde e esporte por meio de cursos livres de excelência, conectando alunos aos maiores profissionais do mercado e oferecendo conhecimento prático, atualizado e relevante para o desenvolvimento, segurança e destaque profissional.",
    visao:
      "Ser reconhecida como referência educacional nacional quando o assunto é esporte conectado à saúde, destacando-se pela excelência do conteúdo, pela qualidade dos especialistas envolvidos e pelo impacto real gerado na carreira dos alunos.",
    valores: [
      "Excelência Técnica",
      "Credibilidade e Ética",
      "Inovação Educacional",
      "Especialização com Propósito",
      "Conexão com o Mercado",
      "Valorização do Conhecimento Profissional",
      "Responsabilidade na integração entre esporte, saúde e performance",
    ],
    historia: [
      {
        _type: "block",
        _key: "intro",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "intro-text",
            text: "A CEBEES é uma instituição de ensino dedicada à formação especializada nas áreas de saúde, esporte, performance e bem-estar, criada para oferecer cursos livres de alta qualidade técnica, atualizados e profundamente conectados à prática profissional.",
          },
        ],
      },
      {
        _type: "block",
        _key: "proposito",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "proposito-text",
            text: "Mais do que ensinar, a CEBEES conecta. Conecta alunos aos principais nomes do mercado, conecta conhecimento técnico à realidade do dia a dia e conecta o esporte à sua base mais essencial: a saúde.",
          },
        ],
      },
      {
        _type: "block",
        _key: "modelo",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "modelo-text",
            text: "Nossa proposta educacional nasce da compreensão de que o esporte não pode ser tratado de forma isolada. Ele precisa estar integrado à ciência da saúde, à performance responsável, à longevidade e ao desenvolvimento humano. Através de tecnologia educacional, curadoria ativa de especialistas e conteúdo de excelência, promovemos uma formação contínua, estratégica e aplicável.",
          },
        ],
      },
    ],
  });
  console.log("  ✓ Página Sobre atualizada\n");

  /* ── Banner ── */
  console.log("🎠 Atualizando Banner Principal...");
  await client.createOrReplace({
    _type: "bannerConfig",
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
  });
  console.log("  ✓ Banner atualizado\n");

  /* ── Site Config ── */
  console.log("⚙️  Atualizando Configurações do Site...");
  await client.createOrReplace({
    _type: "siteConfig",
    _id: "siteConfig",
    nomeInstituicao: "CEBEES — Centro de Estudos em Educação e Bem-Estar Esportivo",
    email: "cbmf.cursos@gmail.com",
    instagram: "https://www.instagram.com/cebees_edu",
    linkedin: "https://www.linkedin.com/company/cebees",
  });
  console.log("  ✓ Site config atualizado\n");

  console.log("✅ Conteúdo institucional atualizado com sucesso!");
}

run().catch((err) => {
  console.error("\n❌ Erro:", err.message);
  process.exit(1);
});
