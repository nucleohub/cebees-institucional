import { client } from "@/sanity/client";
import { cursosLivresQuery, bannersQuery, siteConfigQuery } from "@/sanity/queries";
import HeroBannerSlider, { HeroBanner } from "@/components/ui/HeroBannerSlider";
import CourseCard from "@/components/ui/CourseCard";
import CourseSlider from "@/components/ui/CourseSlider";
import CTAButton from "@/components/ui/CTAButton";
import SectionLabel from "@/components/ui/SectionLabel";
import FAQ from "@/components/ui/FAQ";
import { faqCursosLivres } from "@/lib/faqData";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600;

interface Curso {
  _id: string;
  titulo: string;
  slug: { current: string };
  descricao: string;
  modalidade?: string;
  cargaHoraria?: string;
  categoria?: string;
  imagem?: { asset?: { url: string } };
  inscricoesAbertas?: boolean;
}

interface SiteConfig {
  imagemFoco?: { asset?: { url: string } };
  imagemCursos?: { asset?: { url: string } };
}

interface CursoEstatico {
  _id: string;
  titulo: string;
  slug: { current: string };
  descricao: string;
  modalidade: string;
  cargaHoraria: string;
  categoria: string;
  imagemUrl: string | null;
  inscricoesAbertas: boolean;
}

const cursosEstaticos: CursoEstatico[] = [
  {
    _id: "1",
    titulo: "Base do Treinamento",
    slug: { current: "base-do-treinamento" },
    descricao: "Fundamentos científicos do treinamento de força, periodização e metodologias para evolução consistente.",
    modalidade: "Online", cargaHoraria: "40h", categoria: "Treinamento",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-1-BASE-DO-TREINAMENTO-1.png",
    inscricoesAbertas: true,
  },
  {
    _id: "2",
    titulo: "Fisiculturismo: da teoria ao palco",
    slug: { current: "fisiculturismo-da-teoria-ao-palco" },
    descricao: "Do treinamento à apresentação em palco — tudo sobre fisiculturismo com referências nacionais.",
    modalidade: "Online", cargaHoraria: "28h", categoria: "Fisiculturismo",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-2-FISICULTURISMO-DA-TEORIA-AO-PALCO-1.png",
    inscricoesAbertas: true,
  },
  {
    _id: "3",
    titulo: "Performance",
    slug: { current: "performance" },
    descricao: "Estratégias avançadas de performance: recuperação, periodização e pico de rendimento.",
    modalidade: "Online", cargaHoraria: "30h", categoria: "Treinamento",
    imagemUrl: "/PACK-3-PACK-PERFORMANCE-2.png",
    inscricoesAbertas: true,
  },
  {
    _id: "4",
    titulo: "Mente do Campeão",
    slug: { current: "mente-do-campeao" },
    descricao: "Psicologia do esporte e mentalidade vencedora para resultados de alto nível.",
    modalidade: "Online", cargaHoraria: "20h", categoria: "Treinamento",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-4-MENTE-DO-CAMPEAO-1.png",
    inscricoesAbertas: true,
  },
  {
    _id: "5",
    titulo: "Farmacologia e Suplementação",
    slug: { current: "farmacologia-e-suplementacao" },
    descricao: "Guia completo sobre suplementos e farmacologia esportiva com base científica.",
    modalidade: "Online", cargaHoraria: "35h", categoria: "Saúde",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-5-FARMACOLOGIA-E-SUPLEMENTACAO-1.png",
    inscricoesAbertas: true,
  },
  {
    _id: "6",
    titulo: "Nutrição e Bioquímica",
    slug: { current: "nutricao-e-bioquimica" },
    descricao: "Nutrição esportiva e bioquímica metabólica para otimização do desempenho.",
    modalidade: "Online", cargaHoraria: "40h", categoria: "Saúde",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-6-NUTRICAO-E-BIOQUIMICA-1.png",
    inscricoesAbertas: true,
  },
  {
    _id: "7",
    titulo: "Fisiologia Completa",
    slug: { current: "fisiologia-completa" },
    descricao: "Fisiologia do exercício aplicada — mecanismos corporais que regem a atividade física.",
    modalidade: "Online", cargaHoraria: "50h", categoria: "Saúde",
    imagemUrl: "/PACK-9-FISIOLOGIA-COMPLETA.png",
    inscricoesAbertas: true,
  },
  {
    _id: "8",
    titulo: "Empreendedor Fitness",
    slug: { current: "empreendedor-fitness" },
    descricao: "Como empreender no mercado fitness: gestão, marketing, vendas e negócios.",
    modalidade: "Online", cargaHoraria: "25h", categoria: "Carreiras",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-8-EMPREENDEDOR-FITNESS-1.png",
    inscricoesAbertas: true,
  },
];

const frentes = [
  {
    href: "/cursos-livres",
    label: "Cursos Livres",
    desc: "Capacitações de curta e média duração com certificação, voltadas à prática profissional imediata.",
    detalhe: "Certificação inclusa",
  },
  {
    href: "/tecnologo",
    label: "Tecnólogo",
    desc: "Cursos superiores de tecnologia reconhecidos pelo MEC, com diploma de nível superior.",
    detalhe: "Reconhecimento MEC",
    destaque: true,
  },
  {
    href: "/pos-graduacao",
    label: "Pós-Graduação",
    desc: "Programas lato sensu validados pelo MEC para aprofundamento e especialização profissional.",
    detalhe: "Reconhecimento MEC",
  },
];

const diferenciais = [
  { num: "01", titulo: "Curadoria dos Melhores Profissionais", desc: "Aprenda com quem vive o esporte e a saúde no dia a dia — especialistas com autoridade acadêmica e prática real." },
  { num: "02", titulo: "Conhecimento Técnico com Aplicação Imediata", desc: "Conteúdo atualizado, baseado em evidência científica e pensado para ser aplicado desde a primeira aula." },
  { num: "03", titulo: "Tecnologia a Favor do Aprendizado", desc: "Plataforma moderna com acesso online, sob demanda e flexível para se adaptar à sua rotina." },
  { num: "04", titulo: "Esporte Integrado à Saúde", desc: "Nossa base é a compreensão de que não existe esporte de verdade sem saúde — toda formação parte desse princípio." },
];

export default async function HomePage() {
  const [cursosDb, banners, siteConfig] = await Promise.all([
    client.fetch<Curso[]>(cursosLivresQuery).catch(() => []),
    client.fetch<HeroBanner[]>(bannersQuery).catch(() => []),
    client.fetch<SiteConfig>(siteConfigQuery).catch(() => null),
  ]);

  const cursos: CursoEstatico[] = cursosDb.length > 0
    ? cursosDb.map((c) => ({
        _id: c._id,
        titulo: c.titulo,
        slug: c.slug,
        descricao: c.descricao,
        modalidade: c.modalidade ?? "Online",
        cargaHoraria: c.cargaHoraria ?? "",
        categoria: c.categoria ?? "",
        imagemUrl: c.imagem?.asset?.url ?? null,
        inscricoesAbertas: c.inscricoesAbertas ?? false,
      }))
    : cursosEstaticos;

  const imgFoco = siteConfig?.imagemFoco?.asset?.url ?? "/SAUDE-2.png";
  const imgCursos = siteConfig?.imagemCursos?.asset?.url ?? "/Design sem nome.png";

  return (
    <>
      {/* ── Hero Banner Slider ── */}
      <HeroBannerSlider banners={banners} />

      {/* ── Nosso foco ── */}
      <section className="py-16 bg-[var(--color-bg-alt)]">
        <div className="w-[90%] sm:w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--color-brand)] mb-6 leading-tight">
              Esporte e saúde como base de toda formação
            </h2>
            <p className="text-[var(--color-text-2)] text-base leading-relaxed mb-8">
              A CEBEES nasce para encurtar a distância entre o conhecimento técnico de ponta e a
              prática real do profissional. Oferecemos um modelo educacional ágil, especializado
              e conectado às demandas atuais do mercado — superando os formatos tradicionais e
              posicionando o aluno em um novo patamar de preparo e consciência profissional.
            </p>
            <ul className="space-y-5">
              {[
                { label: "Curadoria Ativa", desc: "Selecionamos os melhores profissionais do mercado para garantir conteúdo técnico com aplicação prática imediata." },
                { label: "Especialização Real", desc: "Vamos além da teoria — nossa formação é orientada ao desenvolvimento real de habilidades profissionais." },
                { label: "Conexão com o Mercado", desc: "Forte integração com academias, clínicas e empresas do setor esportivo para conectar alunos a oportunidades reais." },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0 text-[var(--color-brand)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l3 3 5-5" />
                  </svg>
                  <span className="text-sm text-[var(--color-text-2)] leading-relaxed">
                    <strong className="text-[var(--color-text)]">{item.label}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorativo — imagem CMS ou bloco verde */}
          <div className="hidden lg:flex items-center justify-center">
            {imgFoco ? (
              <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden">
                <Image src={imgFoco} alt="Nosso foco" fill className="object-cover" />
              </div>
            ) : (
              <div className="w-full max-w-sm rounded-2xl bg-[var(--color-brand)] p-12 flex flex-col items-center justify-center min-h-[320px]">
                <span className="text-white/20 text-8xl font-black leading-none select-none">C</span>
                <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mt-4 text-center">
                  Centro Brasileiro de Estudos Esportivos e Saúde
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Cursos Livres CEBEES ── */}
      <section className="py-16 bg-[var(--color-bg)]">
        <div className="w-[90%] sm:w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Decorativo — imagem CMS ou bloco verde */}
          {imgCursos ? (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
              <Image src={imgCursos} alt="Cursos Livres CEBEES" fill className="object-cover" />
            </div>
          ) : (
            <div className="rounded-2xl bg-[var(--color-brand)] p-10 flex flex-col justify-center min-h-[280px]">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">
                CURADORIA ATIVA
              </p>
              <p className="text-white text-base leading-relaxed">
                Aprenda com quem vive o esporte e a saúde no dia a dia. Profissionais com
                autoridade acadêmica e experiência prática, prontos para elevar sua carreira.
              </p>
            </div>
          )}

          {/* Texto */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[var(--color-brand)] mb-3 leading-tight">
              Cursos Livres CEBEES
            </h2>
            <p className="text-[var(--color-text-2)] text-base mb-7">
              Formação especializada em musculação, performance, nutrição, farmacologia, saúde e
              carreira — conteúdo técnico de alto valor agregado para quem quer se destacar.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Musculação, treinamento esportivo e performance de alto nível.",
                "Nutrição aplicada ao esporte, farmacologia e saúde integrativa.",
                "Marketing, vendas e posicionamento no mercado fitness.",
                "Certificação nacional para fortalecer seu currículo profissional.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-2)]">
                  <span className="font-bold text-[var(--color-brand)] shrink-0">{">>"}</span>
                  {item}
                </li>
              ))}
            </ul>
            <CTAButton href="/cursos-livres">Ver Cursos Livres</CTAButton>
          </div>
        </div>
      </section>

      {/* ── 3 Frentes ── */}
      <section className="py-16 bg-[var(--color-bg-alt)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel>Áreas de Formação</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-black text-[var(--color-text)] mb-10 max-w-xl">
            Três caminhos de desenvolvimento profissional
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {frentes.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className={`group flex flex-col p-8 rounded-2xl transition-all hover:shadow-lg ${
                  f.destaque
                    ? "bg-[var(--color-brand)] text-white hover:shadow-[var(--color-brand)]/20"
                    : "bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-brand)] hover:shadow-[var(--color-brand)]/5"
                }`}
              >
                <span className={`text-xs font-bold uppercase tracking-widest mb-6 ${f.destaque ? "text-white/70" : "text-[var(--color-brand)]"}`}>
                  {f.detalhe}
                </span>
                <h3 className={`text-xl font-black mb-3 ${f.destaque ? "text-white" : "text-[var(--color-text)]"}`}>
                  {f.label}
                </h3>
                <p className={`text-sm leading-relaxed flex-1 ${f.destaque ? "text-white/80" : "text-[var(--color-text-2)]"}`}>
                  {f.desc}
                </p>
                <span className={`mt-6 text-xs font-semibold group-hover:translate-x-1 transition-transform inline-block ${f.destaque ? "text-white" : "text-[var(--color-brand)]"}`}>
                  Saiba mais &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cursos em Destaque — slider horizontal ── */}
      <section className="py-16">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel>Cursos Livres</SectionLabel>
          <CourseSlider
            title="Cursos em Destaque"
            linkHref="/cursos-livres"
            linkLabel="Ver todos"
          >
            {cursos.map((curso) => (
              <div key={curso._id} className="shrink-0 w-[270px] sm:w-[290px] snap-start">
                <CourseCard
                  titulo={curso.titulo}
                  slug={curso.slug.current}
                  descricao={curso.descricao}
                  modalidade={curso.modalidade}
                  cargaHoraria={curso.cargaHoraria}
                  imagemUrl={curso.imagemUrl ?? undefined}
                  categoria={curso.categoria}
                  inscricoesAbertas={curso.inscricoesAbertas}
                  basePath="cursos-livres"
                />
              </div>
            ))}
          </CourseSlider>
        </div>
      </section>

      {/* ── Diferenciais ── */}
      <section className="py-16 bg-[var(--color-bg-alt)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel>Por que a CEBEES</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-black text-[var(--color-text)] mb-10 max-w-xl">
            Não existe formação de excelência sem conexão com a prática
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {diferenciais.map((d) => (
              <div key={d.num} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7">
                <span className="text-3xl font-black text-[var(--color-brand)] opacity-40 block mb-4 leading-none">
                  {d.num}
                </span>
                <h3 className="font-bold text-[var(--color-text)] text-sm mb-2 leading-snug">{d.titulo}</h3>
                <p className="text-xs text-[var(--color-text-2)] leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[var(--color-brand)] py-14">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel className="text-white/60">Dúvidas</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Perguntas Frequentes</h2>
          <p className="text-white/70 text-sm">Respostas rápidas sobre nossos cursos e plataforma.</p>
        </div>
      </section>
      <section className="py-14 bg-[var(--color-bg-alt)]">
        <div className="w-[90%] sm:w-[85%] mx-auto max-w-3xl">
          <FAQ items={faqCursosLivres} />
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-20 border-t border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <SectionLabel>Inscreva-se</SectionLabel>
            <h2 className="text-2xl md:text-4xl font-black text-[var(--color-text)] max-w-lg leading-tight">
              Conecte-se aos maiores profissionais do mercado.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <CTAButton href="/cursos-livres">Ver Todos os Cursos</CTAButton>
            <CTAButton href="https://cebees.memberclass.com.br/" variant="outline" external>
              Acessar Plataforma
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
