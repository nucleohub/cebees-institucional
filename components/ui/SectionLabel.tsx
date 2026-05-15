interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-block text-[var(--color-brand)] text-xs font-bold uppercase tracking-[0.15em] mb-3 ${className}`}
    >
      {children}
    </span>
  );
}
