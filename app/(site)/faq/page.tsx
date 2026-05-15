import FAQ from "@/components/ui/FAQ";
import SectionLabel from "@/components/ui/SectionLabel";
import { faqCursosLivres } from "@/lib/faqData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Perguntas frequentes sobre os cursos da CEBEES",
};

export default function FAQPage() {
  return (
    <div className="bg-[var(--color-bg)]">
      {/* Page header */}
      <section className="py-14 border-b border-[var(--color-border)] bg-[var(--color-brand)]">
        <div className="w-[90%] sm:w-[85%] mx-auto">
          <SectionLabel className="text-white/60">CEBEES</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Perguntas Frequentes
          </h1>
          <p className="text-white/70 max-w-2xl text-base leading-relaxed">
            Encontre respostas para as dúvidas mais comuns sobre nossos cursos e plataforma.
          </p>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="py-16 bg-[var(--color-bg-alt)]">
        <div className="w-[90%] sm:w-[85%] mx-auto max-w-3xl">
          <FAQ items={faqCursosLivres} />
        </div>
      </section>
    </div>
  );
}
