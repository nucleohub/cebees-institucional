import { client } from "@/sanity/client";
import { cursoLivreBySlugQuery, cursosLivresQuery } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CTAButton from "@/components/ui/CTAButton";
import SectionLabel from "@/components/ui/SectionLabel";

export const revalidate = 3600;

interface Modulo {
  titulo: string;
  descricao?: string;
  topicos?: string[];
}

interface Professor {
  nome: string;
  cargo?: string;
  bio?: string;
  foto?: { asset?: { url: string } };
}

interface Curso {
  _id: string;
  titulo: string;
  slug: { current: string };
  descricao: string;
  categoria?: string;
  modalidade?: string;
  cargaHoraria?: string;
  preco?: number;
  linkInscricao?: string;
  imagem?: { asset?: { url: string } };
  inscricoesAbertas?: boolean;
  sobreCurso?: unknown[];
  modulosCurso?: Modulo[];
  professores?: Professor[];
}

/* ── Dados estáticos por slug (fallback) ─────────────────────────── */
const cursosEstaticos: Record<string, Partial<Curso>> = {
  "base-do-treinamento": {
    titulo: "Base do Treinamento",
    descricao: "Fundamentos científicos do treinamento de força, periodização e metodologias para evolução consistente.",
    categoria: "Treinamento",
    modalidade: "Online",
    cargaHoraria: "40h",
    inscricoesAbertas: true,
  },
  "fisiculturismo-da-teoria-ao-palco": {
    titulo: "Fisiculturismo: da teoria ao palco",
    descricao: "Do treinamento à apresentação em palco — fisiculturismo com referências nacionais.",
    categoria: "Fisiculturismo",
    modalidade: "Online",
    cargaHoraria: "28h",
    inscricoesAbertas: true,
  },
  "performance": {
    titulo: "Performance",
    descricao: "Estratégias avançadas de performance: recuperação, periodização e pico de rendimento.",
    categoria: "Treinamento",
    modalidade: "Online",
    cargaHoraria: "30h",
    inscricoesAbertas: true,
  },
  "mente-do-campeao": {
    titulo: "Mente do Campeão",
    descricao: "Psicologia do esporte e mentalidade vencedora para resultados de alto nível.",
    categoria: "Treinamento",
    modalidade: "Online",
    cargaHoraria: "20h",
    inscricoesAbertas: true,
  },
  "farmacologia-e-suplementacao": {
    titulo: "Farmacologia e Suplementação",
    descricao: "Guia completo sobre suplementos e farmacologia esportiva com base científica.",
    categoria: "Saúde",
    modalidade: "Online",
    cargaHoraria: "35h",
    inscricoesAbertas: true,
  },
  "nutricao-e-bioquimica": {
    titulo: "Nutrição e Bioquímica",
    descricao: "Nutrição esportiva e bioquímica metabólica para otimização do desempenho.",
    categoria: "Saúde",
    modalidade: "Online",
    cargaHoraria: "40h",
    inscricoesAbertas: true,
  },
  "fisiologia-completa": {
    titulo: "Fisiologia Completa",
    descricao: "Fisiologia do exercício aplicada — mecanismos corporais que regem a atividade física.",
    categoria: "Saúde",
    modalidade: "Online",
    cargaHoraria: "50h",
    inscricoesAbertas: true,
  },
  "empreendedor-fitness": {
    titulo: "Empreendedor Fitness",
    descricao: "Como empreender no mercado fitness: gestão, marketing, vendas e negócios.",
    categoria: "Carreiras",
    modalidade: "Online",
    cargaHoraria: "25h",
    inscricoesAbertas: true,
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cursos = await client
    .fetch<{ slug: { current: string } }[]>(cursosLivresQuery)
    .catch(() => []);
  return cursos.map((c) => ({ slug: c.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const curso = await client.fetch<Curso>(cursoLivreBySlugQuery, { slug }).catch(() => null);
  const fallback = cursosEstaticos[slug];
  const titulo = curso?.titulo ?? fallback?.titulo ?? slug;
  const descricao = curso?.descricao ?? fallback?.descricao ?? "";
  return { title: titulo, description: descricao };
}

export default async function CursoLivrePage({ params }: Props) {
  const { slug } = await params;
  const curso = await client.fetch<Curso>(cursoLivreBySlugQuery, { slug }).catch(() => null);

  /* Usa dados do Sanity se disponíveis; senão usa estático; senão 404 */
  const data: Partial<Curso> | null = curso ?? cursosEstaticos[slug] ?? null;
  if (!data) notFound();

  const linkInscricao = data.linkInscricao ?? "https://cebees.memberclass.com.br/";

  return (
    <div className="bg-[var(--color-bg)]">
      {/* Breadcrumb / Header */}
      <section className="py-10 border-b border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <Link
            href="/cursos-livres"
            className="text-xs text-[var(--color-text-2)] hover:text-[var(--color-brand)] transition-colors mb-6 inline-flex items-center gap-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Cursos Livres
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-4">
            {/* Capa */}
            <div className="relative w-full aspect-video overflow-hidden bg-[var(--color-surface-2)]">
              {data.imagem?.asset?.url ? (
                <Image
                  src={data.imagem.asset.url}
                  alt={data.titulo ?? ""}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl font-black text-[var(--color-brand)] opacity-10">
                    {data.titulo?.charAt(0)}
                  </span>
                </div>
              )}
              {data.categoria && (
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-[var(--color-brand)] text-[var(--color-bg)]">
                  {data.categoria}
                </span>
              )}
            </div>

            {/* Info principal */}
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-[var(--color-text)] mb-4 leading-tight">
                {data.titulo}
              </h1>
              <p className="text-[var(--color-text-2)] text-base leading-relaxed mb-8">
                {data.descricao}
              </p>

              {/* Metadados */}
              <div className="grid grid-cols-1 gap-px bg-[var(--color-border)] mb-8">
                {data.modalidade && (
                  <div className="bg-[var(--color-surface)] px-4 py-3 flex justify-between text-sm">
                    <span className="text-[var(--color-text-2)]">Modalidade</span>
                    <span className="font-semibold text-[var(--color-text)]">{data.modalidade}</span>
                  </div>
                )}
                {data.cargaHoraria && (
                  <div className="bg-[var(--color-surface)] px-4 py-3 flex justify-between text-sm">
                    <span className="text-[var(--color-text-2)]">Carga Horária</span>
                    <span className="font-semibold text-[var(--color-text)]">{data.cargaHoraria}</span>
                  </div>
                )}
                {data.preco !== undefined && (
                  <div className="bg-[var(--color-surface)] px-4 py-3 flex justify-between text-sm">
                    <span className="text-[var(--color-text-2)]">Investimento</span>
                    <span className="font-semibold text-[var(--color-text)]">
                      {data.preco === 0
                        ? "Gratuito"
                        : `R$ ${data.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
                    </span>
                  </div>
                )}
                <div className="bg-[var(--color-surface)] px-4 py-3 flex justify-between text-sm">
                  <span className="text-[var(--color-text-2)]">Inscrições</span>
                  <span
                    className={`font-semibold ${
                      data.inscricoesAbertas ? "text-[var(--color-brand)]" : "text-[var(--color-text-2)]"
                    }`}
                  >
                    {data.inscricoesAbertas ? "Abertas" : "Em breve"}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                {data.inscricoesAbertas ? (
                  <CTAButton href={linkInscricao} external>
                    Quero me inscrever
                  </CTAButton>
                ) : (
                  <CTAButton href="/contato" variant="outline">
                    Avisar quando abrir
                  </CTAButton>
                )}
                <CTAButton href="/cursos-livres" variant="ghost">
                  Ver todos os cursos
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Curso (rich text do Sanity) */}
      {data.sobreCurso && data.sobreCurso.length > 0 && (
        <section className="py-14 border-b border-[var(--color-border)]">
          <div className="w-[90%] sm:w-[85%] mx-auto max-w-3xl">
            <SectionLabel>Sobre o Curso</SectionLabel>
            <h2 className="text-2xl font-black text-[var(--color-text)] mb-8">
              O que você vai aprender
            </h2>
            <div className="prose prose-sm max-w-none text-[var(--color-text-2)] [&_p]:leading-relaxed [&_p]:mb-4 [&_strong]:text-[var(--color-text)] [&_ul]:space-y-2">
              <PortableText value={data.sobreCurso as Parameters<typeof PortableText>[0]["value"]} />
            </div>
          </div>
        </section>
      )}

      {/* Grade de Módulos */}
      {data.modulosCurso && data.modulosCurso.length > 0 && (
        <section className="py-14 border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]">
          <div className="w-[90%] sm:w-[85%] mx-auto">
            <SectionLabel>Conteúdo Programático</SectionLabel>
            <h2 className="text-2xl font-black text-[var(--color-text)] mb-10">
              Grade do Curso
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
              {data.modulosCurso.map((modulo, i) => (
                <div key={i} className="bg-[var(--color-surface)] p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-black text-[var(--color-brand)] tabular-nums mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">
                        {modulo.titulo}
                      </h3>
                      {modulo.descricao && (
                        <p className="text-xs text-[var(--color-text-2)] leading-relaxed mb-3">
                          {modulo.descricao}
                        </p>
                      )}
                      {modulo.topicos && modulo.topicos.length > 0 && (
                        <ul className="space-y-1">
                          {modulo.topicos.map((t, j) => (
                            <li key={j} className="flex items-start gap-2 text-xs text-[var(--color-text-2)]">
                              <span className="w-1 h-1 bg-[var(--color-brand)] mt-1.5 shrink-0 inline-block" />
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Professores */}
      {data.professores && data.professores.length > 0 && (
        <section className="py-14 border-b border-[var(--color-border)]">
          <div className="w-[90%] sm:w-[85%] mx-auto">
            <SectionLabel>Corpo Docente</SectionLabel>
            <h2 className="text-2xl font-black text-[var(--color-text)] mb-10">
              {data.professores.length === 1 ? "Professor" : "Professores"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[var(--color-border)]">
              {data.professores.map((prof, i) => (
                <div key={i} className="bg-[var(--color-surface)] p-6 flex gap-4">
                  {/* Foto */}
                  <div className="relative w-14 h-14 shrink-0 overflow-hidden bg-[var(--color-surface-2)]">
                    {prof.foto?.asset?.url ? (
                      <Image src={prof.foto.asset.url} alt={prof.nome} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-[var(--color-brand)] opacity-30">
                        {prof.nome.charAt(0)}
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[var(--color-text)] leading-snug">
                      {prof.nome}
                    </p>
                    {prof.cargo && (
                      <p className="text-xs text-[var(--color-brand)] mt-0.5">{prof.cargo}</p>
                    )}
                    {prof.bio && (
                      <p className="text-xs text-[var(--color-text-2)] mt-2 leading-relaxed line-clamp-3">
                        {prof.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="py-14 bg-[var(--color-bg-alt)] border-t border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-bold text-[var(--color-text)] mb-1">
              {data.inscricoesAbertas ? "Garanta sua vaga" : "Interesse neste curso?"}
            </p>
            <p className="text-sm text-[var(--color-text-2)]">
              {data.inscricoesAbertas
                ? "As inscrições estão abertas. Acesse a plataforma e matricule-se agora."
                : "Deixe seu contato e avisamos quando as inscrições abrirem."}
            </p>
          </div>
          <div className="flex gap-3">
            {data.inscricoesAbertas ? (
              <CTAButton href={linkInscricao} external>
                Inscrever-se agora
              </CTAButton>
            ) : (
              <CTAButton href="/contato">Avisar quando abrir</CTAButton>
            )}
            <CTAButton href="/cursos-livres" variant="ghost">
              Ver outros cursos
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
