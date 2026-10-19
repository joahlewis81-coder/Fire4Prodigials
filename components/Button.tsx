import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "dark";
  external?: boolean;
  className?: string;
};

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-7 text-[0.95rem] font-semibold tracking-wide transition-[transform,background-color,color,border-color] duration-500 ease-out-expo active:scale-[0.97]";

const variants = {
  solid: "bg-ember text-ink hover:bg-ember-soft",
  ghost: "border border-bone/30 text-bone hover:border-bone hover:bg-bone hover:text-ink",
  dark: "bg-ink text-bone hover:bg-flame",
};

export function Button({ href, children, variant = "solid", external, className = "" }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
        →
      </span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
