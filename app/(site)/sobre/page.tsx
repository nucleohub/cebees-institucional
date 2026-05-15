import { client } from "@/sanity/client";
import { paginaSobreQuery } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a CEBEES — referência educacional em esporte conectado à saúde. Missão, visão, valores e a história de uma instituição criada para transformar carreiras.",
};

interface PaginaSobre {
  missao?: string;
  visao?: string;
  valores?: string[];
  historia?: unknown[];
  equipe?: Array<{ nome: string; cargo: string; foto?: { asset?: { url: string } } }>;
}

export default async function SobrePage() {
  const sobre = await client.fetch<PaginaSobre>(paginaSobreQuery).catch(() => null);

  return (
    <div className="bg-[var(--color-bg)]">
      {/* Header */}
      <section className="py-14 border-b border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel>Institucional</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text)] mb-4 leading-tight">
            Sobre a CEBEES
          </h1>
          <p className="text-[var(--color-text-2)] max-w-2xl text-base leading-relaxed">
            Centro de Estudos em Educação e Bem-Estar Esportivo — instituição dedicada
            à formação especializada em saúde, esporte, performance e bem-estar,
            conectando alunos aos maiores profissionais do mercado.
          </p>
        </div>
      </section>

      {/* MVV */}
      {(sobre?.missao || sobre?.visao || sobre?.valores?.length) && (
        <section className="py-14 bg-[var(--color-bg-alt)] border-b border-[var(--color-border)]">
          <div className="w-[90%] sm:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {sobre?.missao && (
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)] mb-4">
                  Missão
                </h2>
                <p className="text-sm text-[var(--color-text-2)] leading-relaxed">{sobre.missao}</p>
              </div>
            )}
            {sobre?.visao && (
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)] mb-4">
                  Visão
                </h2>
                <p className="text-sm text-[var(--color-text-2)] leading-relaxed">{sobre.visao}</p>
              </div>
            )}
            {sobre?.valores && sobre.valores.length > 0 && (
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
                <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)] mb-4">
                  Valores
                </h2>
                <ul className="space-y-2">
                  {sobre.valores.map((v) => (
                    <li key={v} className="flex items-start gap-2 text-sm text-[var(--color-text-2)]">
                      <span className="w-1.5 h-1.5 bg-[var(--color-brand)] rounded-full mt-1.5 shrink-0 inline-block" />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* História */}
      {sobre?.historia && sobre.historia.length > 0 && (
        <section className="py-14 border-b border-[var(--color-border)]">
          <div className="w-[90%] sm:w-[85%] mx-auto max-w-3xl">
            <SectionLabel>Nossa Trajetória</SectionLabel>
            <h2 className="text-2xl font-black text-[var(--color-text)] mb-8">Nossa História</h2>
            <div className="prose prose-sm max-w-none text-[var(--color-text-2)] [&_p]:leading-relaxed [&_p]:mb-4">
              <PortableText value={sobre.historia as Parameters<typeof PortableText>[0]["value"]} />
            </div>
          </div>
        </section>
      )}

      {/* Equipe */}
      {sobre?.equipe && sobre.equipe.length > 0 && (
        <section className="py-14 bg-[var(--color-bg-alt)] border-b border-[var(--color-border)]">
          <div className="w-[90%] sm:w-[85%] mx-auto">
            <SectionLabel>Pessoas</SectionLabel>
            <h2 className="text-2xl font-black text-[var(--color-text)] mb-10">Nossa Equipe</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {sobre.equipe.map((m) => (
                <div key={m.nome} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
                  <div className="relative w-14 h-14 mb-4 overflow-hidden rounded-full bg-[var(--color-surface-2)]">
                    {m.foto?.asset?.url ? (
                      <Image src={m.foto.asset.url} alt={m.nome} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-[var(--color-brand)] opacity-30">
                        {m.nome.charAt(0)}
                      </div>
                    )}
                  </div>
                  <p className="font-bold text-sm text-[var(--color-text)] leading-snug">{m.nome}</p>
                  <p className="text-xs text-[var(--color-text-2)] mt-0.5">{m.cargo}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fallback */}
      {!sobre && (
        <section className="py-24">
          <div className="w-[90%] sm:w-[85%] mx-auto border border-[var(--color-border)] rounded-2xl p-12 text-center">
            <p className="text-[var(--color-text-2)]">
              Configure o conteúdo desta página no Sanity Studio.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
