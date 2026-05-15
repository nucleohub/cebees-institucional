import { client } from "@/sanity/client";
import { posGraduacoesQuery } from "@/sanity/queries";
import CourseCard from "@/components/ui/CourseCard";
import CTAButton from "@/components/ui/CTAButton";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Pós-Graduação",
  description:
    "Programas de pós-graduação da CEBEES reconhecidos pelo MEC nas áreas de esporte, atividade física e saúde.",
};

interface PosGraduacao {
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

export default async function PosGraduacaoPage() {
  const programas = await client.fetch<PosGraduacao[]>(posGraduacoesQuery).catch(() => []);

  return (
    <div className="bg-[var(--color-bg)]">
      {/* Header */}
      <section className="py-14 border-b border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel>Reconhecimento MEC</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text)] mb-4 leading-tight">
            Pós-Graduação
          </h1>
          <p className="text-[var(--color-text-2)] max-w-2xl text-base leading-relaxed mb-6">
            Programas lato sensu reconhecidos pelo Ministério da Educação para aprofundamento
            e especialização profissional nas áreas de esporte, atividade física e saúde.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Pós-Graduação Lato Sensu", "Reconhecido pelo MEC", "Modalidade EAD e Semipresencial"].map((item) => (
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
          {programas.length > 0 ? (
            <>
              <p className="text-xs text-[var(--color-text-2)] mb-6">
                {programas.length} {programas.length === 1 ? "programa" : "programas"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {programas.map((p) => (
                  <CourseCard
                    key={p._id}
                    titulo={p.titulo}
                    slug={p.slug.current}
                    descricao={p.descricao}
                    modalidade={p.modalidade}
                    duracao={p.duracao}
                    area={p.area}
                    imagem={p.imagem}
                    inscricoesAbertas={p.inscricoesAbertas}
                    mecValidado
                    basePath="pos-graduacao"
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="py-24 border border-[var(--color-border)] rounded-2xl text-center">
              <p className="text-[var(--color-text-2)] text-base mb-2">
                Programas sendo estruturados.
              </p>
              <p className="text-sm text-[var(--color-text-2)]">
                Configure os programas no Sanity Studio.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
        <div className="w-[90%] sm:w-[85%] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-bold text-[var(--color-text)] mb-1">
              Interessado em um programa?
            </p>
            <p className="text-sm text-[var(--color-text-2)]">
              Entre em contato para saber sobre condições e próximas turmas.
            </p>
          </div>
          <div className="flex gap-3">
            <CTAButton href="/contato">Fale Conosco</CTAButton>
            <CTAButton href="https://cebees.memberclass.com.br/" variant="outline" external>
              Acessar Plataforma
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
