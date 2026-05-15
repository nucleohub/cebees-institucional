import Link from "next/link";
import Image from "next/image";

interface CourseCardProps {
  titulo: string;
  slug: string;
  descricao: string;
  modalidade?: string;
  cargaHoraria?: string;
  duracao?: string;
  area?: string;
  categoria?: string;
  imagem?: { asset?: { url: string } };
  imagemUrl?: string;
  inscricoesAbertas?: boolean;
  mecValidado?: boolean;
  basePath: "cursos-livres" | "pos-graduacao" | "tecnologo";
}

const categoryStyle: Record<string, string> = {
  Treinamento:    "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Fisiculturismo: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  Saúde:          "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Carreiras:      "bg-amber-500/10 text-amber-600 border-amber-500/20",
};

export default function CourseCard({
  titulo,
  slug,
  descricao,
  modalidade,
  cargaHoraria,
  duracao,
  area,
  categoria,
  imagem,
  imagemUrl,
  inscricoesAbertas,
  mecValidado,
  basePath,
}: CourseCardProps) {
  const href = `/${basePath}/${slug}`;
  const imgSrc = imagemUrl ?? imagem?.asset?.url;
  const catStyle =
    categoria && categoryStyle[categoria]
      ? categoryStyle[categoria]
      : "bg-[var(--color-surface-2)] text-[var(--color-text-2)] border-[var(--color-border)]";

  return (
    <div className="group flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-brand)] hover:shadow-lg hover:shadow-[var(--color-brand)]/5 rounded-2xl transition-all overflow-hidden">

      {/* Imagem — clicável */}
      <Link href={href} className="block">
        <div className="relative h-44 bg-[var(--color-surface-2)] overflow-hidden rounded-t-2xl">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={titulo}
              fill
              className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-black text-[var(--color-brand)] opacity-10 select-none">
                {titulo.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-5">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {categoria && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${catStyle}`}>
              {categoria}
            </span>
          )}
          {mecValidado && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/20">
              MEC
            </span>
          )}
        </div>

        {/* Título — clicável */}
        <Link href={href}>
          <h3 className="font-bold text-sm text-[var(--color-text)] mb-2 line-clamp-2 group-hover:text-[var(--color-brand)] transition-colors leading-snug">
            {titulo}
          </h3>
        </Link>

        <p className="text-xs text-[var(--color-text-2)] line-clamp-2 mb-4 leading-relaxed flex-1">
          {descricao}
        </p>

        {/* Metadados */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--color-border)] mb-4">
          {(cargaHoraria ?? duracao) && (
            <span className="text-[11px] text-[var(--color-text-2)]">
              {cargaHoraria ?? duracao}
            </span>
          )}
          {modalidade && (
            <span className="text-[11px] text-[var(--color-text-2)]">{modalidade}</span>
          )}
          {area && (
            <span className="text-[11px] text-[var(--color-text-2)]">{area}</span>
          )}
          {inscricoesAbertas !== undefined && (
            <span
              className={`ml-auto text-[10px] font-bold uppercase tracking-wider ${
                inscricoesAbertas
                  ? "text-[var(--color-brand)]"
                  : "text-[var(--color-text-2)]"
              }`}
            >
              {inscricoesAbertas ? "Aberto" : "Em breve"}
            </span>
          )}
        </div>

        {/* Botão Ver mais */}
        <Link
          href={href}
          className="block w-full text-center text-xs font-bold uppercase tracking-wider text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] px-4 py-2.5 rounded-full transition-colors"
        >
          Ver mais
        </Link>
      </div>
    </div>
  );
}
