import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  external?: boolean;
}

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: CTAButtonProps) {
  const base = "inline-block px-6 py-2.5 text-sm font-semibold rounded-full transition-colors";
  const variants = {
    primary:
      "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)]",
    outline:
      "border border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-white",
    ghost:
      "border border-[var(--color-border)] text-[var(--color-text-2)] hover:text-[var(--color-text)] hover:border-[var(--color-text-2)]",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return <Link href={href} className={cls}>{children}</Link>;
}
