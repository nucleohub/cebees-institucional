import { client } from "@/sanity/client";
import { posGraduacaoBySlugQuery, posGraduacoesQuery } from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CTAButton from "@/components/ui/CTAButton";

export const revalidate = 3600;

interface PosGraduacao {
  _id: string;
  titulo: string;
  slug: { current: string };
  descricao: string;
  modalidade?: string;
  duracao?: string;
  area?: string;
  coordenador?: string;
  imagem?: { asset?: { url: string } };
  inscricoesAbertas?: boolean;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const programas = await client.fetch<{ slug: { current: string } }[]>(posGraduacoesQuery).catch(() => []);
  return programas.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programa = await client.fetch<PosGraduacao>(posGraduacaoBySlugQuery, { slug }).catch(() => null);
  if (!programa) return {};
  return { title: programa.titulo, description: programa.descricao };
}

export default async function PosGraduacaoDetalhePage({ params }: Props) {
  const { slug } = await params;
  const programa = await client.fetch<PosGraduacao>(posGraduacaoBySlugQuery, { slug }).catch(() => null);

  if (!programa) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/pos-graduacao" className="text-sm text-[var(--color-accent)] hover:underline mb-6 block">
        ← Voltar para Pós-Graduação
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Imagem */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
          {programa.imagem?.asset?.url ? (
            <Image src={programa.imagem.asset.url} alt={programa.titulo} fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-[var(--color-primary)]/10">
              {programa.titulo.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {programa.area && (
            <span className="inline-block bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {programa.area}
            </span>
          )}
          <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">{programa.titulo}</h1>
          <p className="text-[var(--color-muted)] mb-6 leading-relaxed">{programa.descricao}</p>

          <div className="space-y-3 mb-8">
            {programa.modalidade && (
              <div className="flex items-center gap-3 text-sm">
                <span className="font-medium text-[var(--color-primary)] w-32">Modalidade</span>
                <span className="text-[var(--color-muted)]">{programa.modalidade}</span>
              </div>
            )}
            {programa.duracao && (
              <div className="flex items-center gap-3 text-sm">
                <span className="font-medium text-[var(--color-primary)] w-32">Duração</span>
                <span className="text-[var(--color-muted)]">{programa.duracao}</span>
              </div>
            )}
            {programa.coordenador && (
              <div className="flex items-center gap-3 text-sm">
                <span className="font-medium text-[var(--color-primary)] w-32">Coordenação</span>
                <span className="text-[var(--color-muted)]">{programa.coordenador}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <span className="font-medium text-[var(--color-primary)] w-32">Inscrições</span>
              <span className={`font-semibold ${programa.inscricoesAbertas ? "text-green-600" : "text-gray-400"}`}>
                {programa.inscricoesAbertas ? "Abertas" : "Em breve"}
              </span>
            </div>
          </div>

          {programa.inscricoesAbertas && (
            <CTAButton href="mailto:cbmf.cursos@gmail.com">Quero me inscrever</CTAButton>
          )}
        </div>
      </div>
    </div>
  );
}
