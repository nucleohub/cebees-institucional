"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/cursos-livres", label: "Cursos Livres" },
  { href: "/tecnologo", label: "Tecnólogo" },
  { href: "/pos-graduacao", label: "Pós-Graduação" },
  { href: "/sobre", label: "Sobre" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--color-brand)] sticky top-0 z-50">
      <div className="w-[90%] sm:w-[85%] mx-auto">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            {/* Tenta carregar logo branca local; fallback: texto */}
            <LogoBranca />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://cebees.memberclass.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-wide text-[var(--color-brand)] bg-white px-5 py-2 rounded-full hover:bg-white/90 transition-colors"
            >
              Acessar Plataforma
            </a>
          </div>

          {/* Mobile right */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold px-3 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://cebees.memberclass.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm font-bold uppercase tracking-wide text-center text-[var(--color-brand)] bg-white px-4 py-2.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Acessar Plataforma
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

/* Ícone escudo branco + texto CEBEES */
function LogoBranca() {
  const [broken, setBroken] = useState(false);
  return (
    <div className="flex items-center gap-2.5">
      {!broken && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/favicon-cebees.png"
          alt=""
          className="h-8 w-auto object-contain brightness-0 invert"
          onError={() => setBroken(true)}
        />
      )}
      <span className="font-black text-lg text-white tracking-wide select-none leading-none">
        CEBEES
      </span>
    </div>
  );
}
