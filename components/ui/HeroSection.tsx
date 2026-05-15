import CTAButton from "./CTAButton";

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  ctaSecondaryExternal?: boolean;
}

export default function HeroSection({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref = "/cursos-livres",
  ctaSecondaryLabel,
  ctaSecondaryHref,
  ctaSecondaryExternal,
}: HeroSectionProps) {
  return (
    <section className="bg-[var(--color-bg)] border-b border-[var(--color-border)] py-20">
      <div className="w-[90%] sm:w-[85%] mx-auto">
        {eyebrow && (
          <p className="text-[var(--color-brand)] text-xs font-bold uppercase tracking-[0.2em] mb-5">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-6xl font-black text-[var(--color-text)] leading-[1.05] tracking-tight mb-6 max-w-3xl">
          {title}
        </h1>
        <p className="text-base md:text-lg text-[var(--color-text-2)] mb-10 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
        {(ctaLabel || ctaSecondaryLabel) && (
          <div className="flex flex-col sm:flex-row gap-3">
            {ctaLabel && <CTAButton href={ctaHref}>{ctaLabel}</CTAButton>}
            {ctaSecondaryLabel && ctaSecondaryHref && (
              <CTAButton
                href={ctaSecondaryHref}
                variant="outline"
                external={ctaSecondaryExternal}
              >
                {ctaSecondaryLabel}
              </CTAButton>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
