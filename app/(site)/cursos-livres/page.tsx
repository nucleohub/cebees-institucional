import { client } from "@/sanity/client";
import { cursosLivresQuery } from "@/sanity/queries";
import CourseCard from "@/components/ui/CourseCard";
import CTAButton from "@/components/ui/CTAButton";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cursos Livres",
  description:
    "Cursos livres da CEBEES em musculação, performance, nutrição, farmacologia, saúde e carreira. Conteúdo técnico com os maiores profissionais do mercado, 100% online e com certificação nacional.",
};

interface Curso {
  _id: string;
  titulo: string;
  slug: { current: string };
  descricao: string;
  categoria?: string;
  modalidade?: string;
  cargaHoraria?: string;
  imagem?: { asset?: { url: string } };
  inscricoesAbertas?: boolean;
}

const cursosEstaticos: (Curso & { imagemUrl?: string })[] = [
  {
    _id: "1",
    titulo: "Base do Treinamento",
    slug: { current: "base-do-treinamento" },
    descricao: "Fundamentos científicos do treinamento de força, periodização e metodologias para evolução consistente.",
    categoria: "Treinamento",
    modalidade: "Online",
    cargaHoraria: "40h",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-1-BASE-DO-TREINAMENTO-1.png",
    inscricoesAbertas: true,
  },
  {
    _id: "2",
    titulo: "Fisiculturismo: da teoria ao palco",
    slug: { current: "fisiculturismo-da-teoria-ao-palco" },
    descricao: "Do treinamento à apresentação em palco — fisiculturismo com referências nacionais.",
    categoria: "Fisiculturismo",
    modalidade: "Online",
    cargaHoraria: "28h",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-2-FISICULTURISMO-DA-TEORIA-AO-PALCO-1.png",
    inscricoesAbertas: true,
  },
  {
    _id: "3",
    titulo: "Performance",
    slug: { current: "performance" },
    descricao: "Estratégias avançadas de performance: recuperação, periodização e pico de rendimento.",
    categoria: "Treinamento",
    modalidade: "Online",
    cargaHoraria: "30h",
    imagemUrl: "/PACK-3-PACK-PERFORMANCE-2.png",
    inscricoesAbertas: true,
  },
  {
    _id: "4",
    titulo: "Mente do Campeão",
    slug: { current: "mente-do-campeao" },
    descricao: "Psicologia do esporte e mentalidade vencedora para resultados de alto nível.",
    categoria: "Treinamento",
    modalidade: "Online",
    cargaHoraria: "20h",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-4-MENTE-DO-CAMPEAO-1.png",
    inscricoesAbertas: true,
  },
  {
    _id: "5",
    titulo: "Farmacologia e Suplementação",
    slug: { current: "farmacologia-e-suplementacao" },
    descricao: "Guia completo sobre suplementos e farmacologia esportiva com base científica.",
    categoria: "Saúde",
    modalidade: "Online",
    cargaHoraria: "35h",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-5-FARMACOLOGIA-E-SUPLEMENTACAO-1.png",
    inscricoesAbertas: true,
  },
  {
    _id: "6",
    titulo: "Nutrição e Bioquímica",
    slug: { current: "nutricao-e-bioquimica" },
    descricao: "Nutrição esportiva e bioquímica metabólica para otimização do desempenho.",
    categoria: "Saúde",
    modalidade: "Online",
    cargaHoraria: "40h",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-6-NUTRICAO-E-BIOQUIMICA-1.png",
    inscricoesAbertas: true,
  },
  {
    _id: "7",
    titulo: "Fisiologia Completa",
    slug: { current: "fisiologia-completa" },
    descricao: "Fisiologia do exercício aplicada — mecanismos corporais que regem a atividade física.",
    categoria: "Saúde",
    modalidade: "Online",
    cargaHoraria: "50h",
    imagemUrl: "/PACK-9-FISIOLOGIA-COMPLETA.png",
    inscricoesAbertas: true,
  },
  {
    _id: "8",
    titulo: "Empreendedor Fitness",
    slug: { current: "empreendedor-fitness" },
    descricao: "Como empreender no mercado fitness: gestão, marketing, vendas e negócios.",
    categoria: "Carreiras",
    modalidade: "Online",
    cargaHoraria: "25h",
    imagemUrl: "https://cebees.com.br/wp-content/uploads/2026/03/PACK-8-EMPREENDEDOR-FITNESS-1.png",
    inscricoesAbertas: true,
  },
];

const categorias = ["Todos", "Treinamento", "Fisiculturismo", "Saúde", "Carreiras"];

export default async function CursosLivresPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const categoriaAtiva = categoria ?? "Todos";

  const sanityData = await client.fetch<Curso[]>(cursosLivresQuery).catch(() => []);
  const useSanity = sanityData.length > 0;

  const listaBase = useSanity ? sanityData : cursosEstaticos;
  const cursosFiltrados =
    categoriaAtiva === "Todos"
      ? listaBase
      : listaBase.filter((c) => (c as { categoria?: string }).categoria === categoriaAtiva);

  return (
    <div className="bg-[var(--color-bg)]">
      {/* Header */}
      <section className="py-14 border-b border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel>Formação Especializada</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text)] mb-4 leading-tight">
            Cursos Livres
          </h1>
          <p className="text-[var(--color-text-2)] max-w-2xl text-base leading-relaxed">
            Formação especializada em musculação, performance, nutrição, farmacologia, saúde e
            carreira — com curadoria dos maiores profissionais do mercado e conteúdo técnico
            de aplicação imediata.
          </p>
        </div>
      </section>

      {/* Filtros por categoria */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]">
        <div className="w-[90%] sm:w-[85%] mx-auto py-3 flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <a
              key={cat}
              href={cat === "Todos" ? "/cursos-livres" : `/cursos-livres?categoria=${cat}`}
              className={`text-sm font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                categoriaAtiva === cat
                  ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)]"
                  : "text-[var(--color-text-2)] border-[var(--color-border)] hover:text-[var(--color-text)] hover:border-[var(--color-text-2)]"
              }`}
            >
              {cat}
            </a>
          ))}
        </div>
      </section>

      {/* Grid de cursos */}
      <section className="py-10">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          {cursosFiltrados.length > 0 ? (
            <>
              <p className="text-xs text-[var(--color-text-2)] mb-6">
                {cursosFiltrados.length}{" "}
                {cursosFiltrados.length === 1 ? "curso" : "cursos"}
                {categoriaAtiva !== "Todos" ? ` em ${categoriaAtiva}` : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {useSanity
                  ? (cursosFiltrados as Curso[]).map((curso) => (
                      <CourseCard
                        key={curso._id}
                        titulo={curso.titulo}
                        slug={curso.slug.current}
                        descricao={curso.descricao}
                        modalidade={curso.modalidade}
                        cargaHoraria={curso.cargaHoraria}
                        categoria={(curso as { categoria?: string }).categoria}
                        imagem={curso.imagem}
                        inscricoesAbertas={curso.inscricoesAbertas}
                        basePath="cursos-livres"
                      />
                    ))
                  : (cursosFiltrados as typeof cursosEstaticos).map((curso) => (
                      <CourseCard
                        key={curso._id}
                        titulo={curso.titulo}
                        slug={curso.slug.current}
                        descricao={curso.descricao}
                        modalidade={curso.modalidade}
                        cargaHoraria={curso.cargaHoraria}
                        categoria={curso.categoria}
                        imagemUrl={curso.imagemUrl}
                        inscricoesAbertas={curso.inscricoesAbertas}
                        basePath="cursos-livres"
                      />
                    ))}
              </div>
            </>
          ) : (
            <div className="py-24 text-center text-[var(--color-text-2)]">
              <p className="text-base">Nenhum curso nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
        <div className="w-[90%] sm:w-[85%] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-bold text-[var(--color-text)] mb-1">Já é aluno da CEBEES?</p>
            <p className="text-sm text-[var(--color-text-2)]">
              Acesse a plataforma para continuar seus estudos e baixar certificados.
            </p>
          </div>
          <CTAButton href="https://cebees.memberclass.com.br/" external>
            Acessar Plataforma
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
