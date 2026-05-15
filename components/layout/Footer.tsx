"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-footer-bg)] border-t border-[var(--color-border)]">
      <div className="w-[90%] sm:w-[85%] mx-auto py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand — 4 cols */}
          <div className="md:col-span-4">
            {/* Logo branca — coloque public/logo-cebees-branca.png */}
            <LogoFooter />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Centro Brasileiro de Estudos Esportivos e Saúde — formação profissional
              nas áreas do esporte, atividade física e saúde.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/cebees_edu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/50 hover:text-[var(--color-brand-light)] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@cebees"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/50 hover:text-[var(--color-brand-light)] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns — 8 cols */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                Formação
              </h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/cursos-livres" className="text-white/70 hover:text-white transition-colors">Cursos Livres</Link></li>
                <li><Link href="/tecnologo" className="text-white/70 hover:text-white transition-colors">Tecnólogo</Link></li>
                <li><Link href="/pos-graduacao" className="text-white/70 hover:text-white transition-colors">Pós-Graduação</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                Institucional
              </h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/sobre" className="text-white/70 hover:text-white transition-colors">Sobre a CEBEES</Link></li>
                <li>
                  <a href="https://cebees.memberclass.com.br/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                    Plataforma EAD
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                Suporte
              </h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/contato" className="text-white/70 hover:text-white transition-colors">Contato</Link></li>
                <li><Link href="/ouvidoria" className="text-white/70 hover:text-white transition-colors">Ouvidoria</Link></li>
                <li><Link href="/politica-de-privacidade" className="text-white/70 hover:text-white transition-colors">Política de Privacidade</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/30">
          <span>© {new Date().getFullYear()} CEBEES — Centro Brasileiro de Estudos Esportivos e Saúde</span>
          <span>Todos os direitos reservados</span>
        </div>
      </div>
    </footer>
  );
}

/* Ícone escudo branco + texto CEBEES */
function LogoFooter() {
  const [broken, setBroken] = useState(false);
  return (
    <div className="flex items-center gap-2.5 mb-5">
      {!broken && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/favicon-cebees.png"
          alt=""
          className="h-8 w-auto object-contain brightness-0 invert opacity-90"
          onError={() => setBroken(true)}
        />
      )}
      <span className="font-black text-lg text-white tracking-wide select-none leading-none opacity-90">
        CEBEES
      </span>
    </div>
  );
}
