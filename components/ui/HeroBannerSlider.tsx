"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";

export interface HeroBanner {
  _id: string;
  titulo: string;
  subtitulo?: string;
  imagem?: { asset?: { url: string } };
  ctaPrimario?: { label?: string; url?: string };
  ctaSecundario?: { label?: string; url?: string };
}

interface HeroBannerSliderProps {
  banners?: HeroBanner[];
}

const FALLBACK: HeroBanner[] = [
  { _id: "b1", titulo: "", imagem: { asset: { url: "/1.png" } } },
  { _id: "b2", titulo: "", imagem: { asset: { url: "/2.png" } } },
  { _id: "b3", titulo: "", imagem: { asset: { url: "/3.png" } } },
  { _id: "b4", titulo: "", imagem: { asset: { url: "/4.png" } } },
];

export default function HeroBannerSlider({ banners }: HeroBannerSliderProps) {
  const slides = banners && banners.length > 0 ? banners : FALLBACK;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [slides.length]
  );
  const prev = () =>
    setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused, slides.length]);

  const slide = slides[current];
  const hasImg = !!slide.imagem?.asset?.url;
  // Quando não há título, a imagem já contém o texto — exibe sem overlay
  const imageOnly = hasImg && !slide.titulo;

  return (
    <section
      className="relative overflow-hidden min-h-[540px] md:min-h-[620px] flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Fundo ── */}
      {hasImg ? (
        <>
          <Image
            key={slide._id}
            src={slide.imagem!.asset!.url}
            alt={slide.titulo || "Banner CEBEES"}
            fill
            className="object-cover transition-opacity duration-700"
            priority
          />
          {/* Overlay escuro apenas quando há texto por cima */}
          {!imageOnly && <div className="absolute inset-0 bg-black/60" />}
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0a2e06 0%, #0e5107 45%, #196b0d 75%, #0b3806 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "36px 36px",
            }}
          />
        </div>
      )}

      {/* ── Conteúdo de texto (oculto em banners image-only) ── */}
      {!imageOnly && (
        <div className="relative z-10 w-[90%] sm:w-[85%] mx-auto py-24">
          <p className="text-white/60 text-xs font-bold uppercase tracking-[0.2em] mb-5">
            Centro Brasileiro de Estudos Esportivos e Saúde
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6 max-w-3xl">
            {slide.titulo}
          </h1>
          {slide.subtitulo && (
            <p className="text-base md:text-lg text-white/75 mb-10 max-w-2xl leading-relaxed">
              {slide.subtitulo}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            {slide.ctaPrimario?.url && slide.ctaPrimario?.label ? (
              <CTAButton href={slide.ctaPrimario.url}>
                {slide.ctaPrimario.label}
              </CTAButton>
            ) : (
              <CTAButton href="/cursos-livres">Ver Cursos Livres</CTAButton>
            )}
            {slide.ctaSecundario?.url && slide.ctaSecundario?.label && (
              <CTAButton
                href={slide.ctaSecundario.url}
                variant="outline"
                external={slide.ctaSecundario.url.startsWith("http")}
              >
                {slide.ctaSecundario.label}
              </CTAButton>
            )}
          </div>
        </div>
      )}

      {/* ── Setas ── */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Banner anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Próximo banner"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* ── Dots ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Banner ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
