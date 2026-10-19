import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10 md:py-20">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo.png" alt="" width={52} height={52} className="rounded-full" />
            <span className="font-display text-3xl">Fire4Prodigals</span>
          </div>
          <p className="mt-5 text-bone/60">{site.region}</p>
          <p className="mt-3 font-display text-xl italic text-bone/80">
            “He brought me up out of the pit.” <span className="not-italic text-bone/50">Psalm 40:2</span>
          </p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-3">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-underline text-bone/75 hover:text-bone">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Reach us</p>
          <ul className="mt-5 space-y-3 text-bone/75">
            <li>{site.founders}</li>
            <li>
              <a href={site.phoneHref} className="link-underline hover:text-bone">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.linktreeUrl} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-bone">
                All our links
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 border-t border-bone/10 px-5 py-6 text-sm text-bone/40 md:flex-row md:px-10">
        <p>© {new Date().getFullYear()} Fire4Prodigals. All rights reserved.</p>
        <p>Come as you are.</p>
      </div>
    </footer>
  );
}
