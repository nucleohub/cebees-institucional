import SectionLabel from "@/components/ui/SectionLabel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a CEBEES. Atendimento via e-mail, WhatsApp e redes sociais para dúvidas sobre cursos, inscrições e suporte.",
};

const canais = [
  {
    titulo: "E-mail",
    descricao: "Para dúvidas gerais, inscrições e suporte acadêmico.",
    valor: "cbmf.cursos@gmail.com",
    href: "mailto:cbmf.cursos@gmail.com",
    label: "Enviar e-mail",
    icone: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    titulo: "Instagram",
    descricao: "Acompanhe novidades, conteúdos e novos cursos.",
    valor: "@cebees_edu",
    href: "https://www.instagram.com/cebees_edu",
    label: "Seguir no Instagram",
    icone: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    titulo: "YouTube",
    descricao: "Conteúdos educativos e apresentações dos nossos cursos.",
    valor: "@cebees",
    href: "https://www.youtube.com/@cebees",
    label: "Acessar canal",
    icone: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    titulo: "Plataforma EAD",
    descricao: "Acesse seus cursos, certificados e suporte acadêmico.",
    valor: "cebees.memberclass.com.br",
    href: "https://cebees.memberclass.com.br/",
    label: "Acessar plataforma",
    icone: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

export default function ContatoPage() {
  return (
    <div className="bg-[var(--color-bg)]">
      {/* Header */}
      <section className="py-14 border-b border-[var(--color-border)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel>Fale Conosco</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text)] mb-4 leading-tight">
            Contato
          </h1>
          <p className="text-[var(--color-text-2)] max-w-2xl text-base leading-relaxed">
            Estamos disponíveis para tirar dúvidas sobre cursos, inscrições, plataforma e
            certificações. Escolha o canal mais conveniente para você.
          </p>
        </div>
      </section>

      {/* Canais */}
      <section className="py-14">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {canais.map((canal) => (
              <div
                key={canal.titulo}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7 flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-[var(--color-brand)]/10 flex items-center justify-center text-[var(--color-brand)] mb-5">
                  {canal.icone}
                </div>
                <h2 className="font-black text-[var(--color-text)] text-base mb-1">
                  {canal.titulo}
                </h2>
                <p className="text-xs text-[var(--color-text-2)] leading-relaxed mb-4 flex-1">
                  {canal.descricao}
                </p>
                <p className="text-xs font-semibold text-[var(--color-brand)] mb-4 truncate">
                  {canal.valor}
                </p>
                <a
                  href={canal.href}
                  target={canal.href.startsWith("http") ? "_blank" : undefined}
                  rel={canal.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-xs font-bold uppercase tracking-wide text-center text-white bg-[var(--color-brand)] px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  {canal.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aviso de atendimento */}
      <section className="py-10 border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
        <div className="w-[90%] sm:w-[85%] mx-auto max-w-2xl text-center">
          <p className="text-sm text-[var(--color-text-2)] leading-relaxed">
            Nosso time responde em até <strong className="text-[var(--color-text)]">2 dias úteis</strong>.
            Para reclamações ou sugestões formais, utilize nossa{" "}
            <a href="/ouvidoria" className="text-[var(--color-brand)] hover:underline font-medium">
              Ouvidoria
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
