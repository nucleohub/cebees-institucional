import SectionLabel from "@/components/ui/SectionLabel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ouvidoria",
  description:
    "Ouvidoria da CEBEES — canal oficial para reclamações, sugestões, elogios e denúncias. Sua manifestação é tratada com sigilo e seriedade.",
};

const tiposManifestacao = [
  {
    tipo: "Reclamação",
    desc: "Insatisfação com serviços, atendimento, conteúdo ou plataforma.",
    cor: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    tipo: "Sugestão",
    desc: "Ideias para melhorar cursos, plataforma ou atendimento.",
    cor: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    tipo: "Elogio",
    desc: "Reconhecimento a profissionais, cursos ou serviços da CEBEES.",
    cor: "text-[var(--color-brand)]",
    bg: "bg-[var(--color-brand)]/10",
  },
  {
    tipo: "Denúncia",
    desc: "Condutas irregulares, violações éticas ou problemas graves.",
    cor: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const etapas = [
  { num: "01", titulo: "Envie sua manifestação", desc: "Descreva detalhadamente o ocorrido pelo e-mail da ouvidoria." },
  { num: "02", titulo: "Protocolo gerado", desc: "Você receberá um número de protocolo para acompanhar sua solicitação." },
  { num: "03", titulo: "Análise interna", desc: "Nossa equipe analisa e investiga a manifestação com imparcialidade." },
  { num: "04", titulo: "Retorno ao solicitante", desc: "Respondemos em até 10 dias úteis com o resultado ou encaminhamento." },
];

export default function OuvidoriaPage() {
  return (
    <div className="bg-[var(--color-bg)]">
      {/* Header */}
      <section className="py-14 border-b border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel>Canal Oficial</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text)] mb-4 leading-tight">
            Ouvidoria
          </h1>
          <p className="text-[var(--color-text-2)] max-w-2xl text-base leading-relaxed">
            A Ouvidoria da CEBEES é o canal oficial para registrar reclamações, sugestões,
            elogios e denúncias. Todas as manifestações são tratadas com sigilo, imparcialidade
            e seriedade — contribuindo para a melhoria contínua da nossa instituição.
          </p>
        </div>
      </section>

      {/* Tipos de manifestação */}
      <section className="py-14 bg-[var(--color-bg-alt)] border-b border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel>Tipos de Manifestação</SectionLabel>
          <h2 className="text-2xl font-black text-[var(--color-text)] mb-8">
            O que você pode registrar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {tiposManifestacao.map((item) => (
              <div
                key={item.tipo}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${item.bg} mb-4`}>
                  <span className={`text-lg font-black ${item.cor}`}>!</span>
                </div>
                <h3 className={`font-black text-sm mb-2 ${item.cor}`}>{item.tipo}</h3>
                <p className="text-xs text-[var(--color-text-2)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-14 border-b border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel>Processo</SectionLabel>
          <h2 className="text-2xl font-black text-[var(--color-text)] mb-8">
            Como funciona
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {etapas.map((e) => (
              <div key={e.num} className="flex flex-col">
                <span className="text-4xl font-black text-[var(--color-brand)] opacity-30 leading-none mb-4">
                  {e.num}
                </span>
                <h3 className="font-bold text-[var(--color-text)] text-sm mb-2">{e.titulo}</h3>
                <p className="text-xs text-[var(--color-text-2)] leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Enviar manifestação */}
      <section className="py-14 bg-[var(--color-bg-alt)]">
        <div className="w-[90%] sm:w-[85%] mx-auto max-w-2xl">
          <SectionLabel>Registrar</SectionLabel>
          <h2 className="text-2xl font-black text-[var(--color-text)] mb-2">
            Envie sua manifestação
          </h2>
          <p className="text-sm text-[var(--color-text-2)] mb-8 leading-relaxed">
            Para registrar sua manifestação, envie um e-mail para nossa ouvidoria com:
            tipo de manifestação (reclamação, sugestão, elogio ou denúncia), descrição
            detalhada do ocorrido, data e, se possível, evidências. Sua identidade pode
            ser mantida em sigilo a pedido.
          </p>

          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-[var(--color-text)] text-sm mb-1">E-mail da Ouvidoria</p>
                <a
                  href="mailto:cbmf.cursos@gmail.com?subject=Manifestação Ouvidoria CEBEES"
                  className="text-[var(--color-brand)] font-semibold text-sm hover:underline"
                >
                  cbmf.cursos@gmail.com
                </a>
                <p className="text-xs text-[var(--color-text-2)] mt-1">
                  Use o assunto: <strong>Manifestação Ouvidoria CEBEES</strong>
                </p>
              </div>
            </div>

            <a
              href="mailto:cbmf.cursos@gmail.com?subject=Manifestação Ouvidoria CEBEES"
              className="block w-full text-center text-sm font-bold uppercase tracking-wide text-white bg-[var(--color-brand)] px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Abrir e-mail da Ouvidoria
            </a>
          </div>

          <p className="text-xs text-[var(--color-text-2)] mt-6 leading-relaxed text-center">
            Prazo de resposta: até <strong>10 dias úteis</strong> após o recebimento.
            Manifestações anônimas são aceitas. Dados pessoais tratados conforme nossa{" "}
            <a href="/politica-de-privacidade" className="text-[var(--color-brand)] hover:underline">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
