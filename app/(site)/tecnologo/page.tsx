import { client } from "@/sanity/client";
import CourseCard from "@/components/ui/CourseCard";
import CTAButton from "@/components/ui/CTAButton";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tecnólogo",
  description:
    "Cursos superiores de Tecnólogo da CEBEES reconhecidos pelo MEC, com diploma de nível superior nas áreas de esporte e saúde.",
};

interface Tecnologo {
  _id: string;
  titulo: string;
  slug: { current: string };
  descricao: string;
  modalidade?: string;
  duracao?: string;
  area?: string;
  imagem?: { asset?: { url: string } };
  inscricoesAbertas?: boolean;
}

export default async function TecnologoPage() {
  const tecnologos = await client
    .fetch<Tecnologo[]>(`*[_type == "tecnologo"] | order(_createdAt desc) { _id, titulo, slug, descricao, modalidade, duracao, area, imagem { asset->{ url } }, inscricoesAbertas }`)
    .catch(() => []);

  return (
    <div className="bg-[var(--color-bg)]">
      {/* Header */}
      <section className="py-14 border-b border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel>Reconhecimento MEC</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text)] mb-4 leading-tight">
            Tecnólogo
          </h1>
          <p className="text-[var(--color-text-2)] max-w-2xl text-base leading-relaxed mb-6">
            Cursos superiores de tecnologia reconhecidos pelo Ministério da Educação,
            com diploma de nível superior e formação prática nas áreas de esporte,
            atividade física e saúde.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Diploma de Nível Superior", "Reconhecido pelo MEC", "Modalidade EAD e Semipresencial"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-[var(--color-text-2)] bg-[var(--color-surface)] border border-[var(--color-border)] px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-[var(--color-brand)] rounded-full inline-block" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          {tecnologos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {tecnologos.map((t) => (
                <CourseCard
                  key={t._id}
                  titulo={t.titulo}
                  slug={t.slug.current}
                  descricao={t.descricao}
                  modalidade={t.modalidade}
                  duracao={t.duracao}
                  area={t.area}
                  imagem={t.imagem}
                  inscricoesAbertas={t.inscricoesAbertas}
                  mecValidado
                  basePath="tecnologo"
                />
              ))}
            </div>
          ) : (
            <div className="py-24 border border-[var(--color-border)] rounded-2xl text-center">
              <p className="text-[var(--color-text-2)] text-base mb-2">
                Cursos sendo estruturados.
              </p>
              <p className="text-sm text-[var(--color-text-2)]">
                Em breve disponíveis. Cadastre-se para receber novidades.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* O que é Tecnólogo */}
      <section className="py-14 bg-[var(--color-bg-alt)] border-t border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <SectionLabel>O que é Tecnólogo</SectionLabel>
            <h2 className="text-2xl font-black text-[var(--color-text)] mb-4">
              Curso superior com foco prático e diploma reconhecido
            </h2>
            <p className="text-[var(--color-text-2)] text-sm leading-relaxed">
              O Tecnólogo é um curso de graduação de curta duração, regulamentado pelo
              MEC, que confere diploma de nível superior. Tem foco na aplicação prática
              de conhecimentos em uma área específica, sendo ideal para quem quer se
              especializar com eficiência e velocidade.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { titulo: "Duração", desc: "De 2 a 3 anos — mais rápido que uma graduação tradicional." },
              { titulo: "Reconhecimento", desc: "Diploma de nível superior reconhecido pelo MEC em todo o território nacional." },
              { titulo: "Mercado de Trabalho", desc: "Formação orientada para demandas reais do mercado de esporte e saúde." },
            ].map((item) => (
              <div key={item.titulo} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
                <h3 className="font-bold text-sm text-[var(--color-text)] mb-1">{item.titulo}</h3>
                <p className="text-xs text-[var(--color-text-2)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 border-t border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-bold text-[var(--color-text)] mb-1">Interessado no Tecnólogo?</p>
            <p className="text-sm text-[var(--color-text-2)]">
              Entre em contato para saber sobre as próximas turmas.
            </p>
          </div>
          <CTAButton href="/contato">Fale Conosco</CTAButton>
        </div>
      </section>
    </div>
  );
}
