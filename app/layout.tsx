import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CEBEES — Centro de Estudos em Educação e Bem-Estar Esportivo",
    template: "%s | CEBEES",
  },
  description:
    "A CEBEES é referência educacional em esporte conectado à saúde. Cursos livres especializados em musculação, performance, nutrição, farmacologia, saúde e carreira — com os maiores profissionais do mercado.",
  icons: {
    icon: [
      { url: "/favicon-cebees.png", type: "image/png" },
    ],
    apple: "/favicon-cebees.png",
    shortcut: "/favicon-cebees.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "CEBEES",
    images: [{ url: "/logo-cebees-cor.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      {/* Prevent flash of wrong theme */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('cebees-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=(t==='light'||(!t&&!d))?'light':'dark';document.documentElement.setAttribute('data-theme',theme);})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        {children}
      </body>
    </html>
  );
}
