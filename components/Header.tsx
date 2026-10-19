"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/content/site";
import { lockScroll } from "./SmoothScroll";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => lockScroll(open), [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,padding,border-color] duration-700 ease-out-expo ${
          scrolled || open
            ? "border-b border-bone/10 bg-ink/70 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
            <Image
              src="/brand/logo.png"
              alt=""
              width={44}
              height={44}
              priority
              className={`rounded-full transition-[width,height] duration-700 ease-out-expo ${scrolled ? "h-9 w-9" : "h-11 w-11"}`}
            />
            <span className="font-display text-2xl leading-none tracking-tight">Fire4Prodigals</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={pathname.startsWith(n.href) ? "page" : undefined}
                className="link-underline text-sm font-medium text-bone/80 transition-colors hover:text-bone aria-[current=page]:text-bone"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={site.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-500 hover:bg-ember-soft"
            >
              Donate
            </a>
          </nav>

          <button
            className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`absolute h-px w-6 bg-bone transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span className={`absolute h-px w-6 bg-bone transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-12 pt-28 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="ember-glow opacity-60" />
            <nav className="relative flex flex-col gap-2" aria-label="Mobile">
              {[{ href: "/", label: "Home" }, ...nav].map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={n.href} className="font-display text-5xl leading-tight">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.a
              href={site.donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-ember font-semibold text-ink"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Donate
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
