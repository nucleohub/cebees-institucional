"use client";

import { useRef } from "react";

interface CourseSliderProps {
  children: React.ReactNode;
  title?: string;
  linkHref?: string;
  linkLabel?: string;
}

export default function CourseSlider({
  children,
  title,
  linkHref,
  linkLabel,
}: CourseSliderProps) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    const amount = ref.current.clientWidth * 0.75;
    ref.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Header row */}
      {(title || linkHref) && (
        <div className="flex items-center justify-between mb-6">
          {title && (
            <h2 className="text-2xl md:text-3xl font-black text-[var(--color-text)]">
              {title}
            </h2>
          )}
          <div className="flex items-center gap-2">
            {linkHref && linkLabel && (
              <a
                href={linkHref}
                className="text-sm text-[var(--color-brand)] font-medium hover:underline hidden sm:block"
              >
                {linkLabel} &rarr;
              </a>
            )}
            {/* Arrow buttons */}
            <button
              onClick={() => scroll("left")}
              aria-label="Anterior"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-2)] hover:text-[var(--color-brand)] hover:border-[var(--color-brand)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Próximo"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-2)] hover:text-[var(--color-brand)] hover:border-[var(--color-brand)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Slider track */}
      <div
        ref={ref}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
