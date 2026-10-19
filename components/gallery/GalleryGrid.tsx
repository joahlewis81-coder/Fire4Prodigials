"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { photos } from "@/content/gallery";
import { lockScroll } from "../SmoothScroll";
import { Portal } from "../Portal";

const ease = [0.16, 1, 0.3, 1] as const;

export function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);
  const [dir, setDir] = useState(0);

  const go = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length));
  }, []);

  useEffect(() => {
    lockScroll(index !== null);
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const current = index !== null ? photos[index] : null;

  return (
    <>
      <ul className="columns-2 gap-3 md:columns-3 md:gap-5 [&>li]:mb-3 md:[&>li]:mb-5 [&>li]:break-inside-avoid">
        {photos.map((p, i) => (
          <motion.li
            key={p.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 1, ease, delay: (i % 3) * 0.08 }}
          >
            <button onClick={() => setIndex(i)} className="group block w-full cursor-zoom-in overflow-hidden rounded-xl" aria-label={`Open photo: ${p.alt}`}>
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="h-auto w-full transition-[transform,filter] duration-[1.2s] ease-out-expo group-hover:scale-[1.04] group-hover:brightness-110"
              />
            </button>
          </motion.li>
        ))}
      </ul>

      <Portal>
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 backdrop-blur-md"
            role="dialog"
            aria-modal
            aria-label="Photo viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIndex(null)}
          >
            <AnimatePresence mode="popLayout" custom={dir}>
              <motion.div
                key={current.src}
                custom={dir}
                initial={{ opacity: 0, x: dir * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -80 }}
                transition={{ duration: 0.6, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1);
                  else if (info.offset.x > 60) go(-1);
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative h-[80dvh] w-[92vw] max-w-6xl touch-pan-y"
              >
                <Image src={current.src} alt={current.alt} fill sizes="92vw" className="pointer-events-none object-contain" />
              </motion.div>
            </AnimatePresence>

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-bone/60">
              {index! + 1} / {photos.length}
            </p>
            {[
              { d: -1, label: "Previous photo", cls: "left-3 md:left-8", icon: "←" },
              { d: 1, label: "Next photo", cls: "right-3 md:right-8", icon: "→" },
            ].map((b) => (
              <button
                key={b.d}
                aria-label={b.label}
                onClick={(e) => {
                  e.stopPropagation();
                  go(b.d);
                }}
                className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/20 bg-ink/50 transition-colors hover:bg-bone hover:text-ink sm:flex ${b.cls}`}
              >
                {b.icon}
              </button>
            ))}
            <button
              aria-label="Close"
              onClick={() => setIndex(null)}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-bone/20 text-2xl transition-colors hover:bg-bone hover:text-ink md:right-8 md:top-8"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      </Portal>
    </>
  );
}
