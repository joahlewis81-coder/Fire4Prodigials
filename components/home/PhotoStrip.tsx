"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { photo } from "@/content/gallery";
import { Button } from "../Button";
import { Reveal } from "../Reveal";

const rowA = ["worship-tent-band", "prayer-laying-hands", "lumberton-main-street", "worship-hands-raised", "outreach-team"].map(photo);
const rowB = ["prayer-under-tent", "street-outreach", "celebrate-recovery-testimony", "resource-table", "outreach-family"].map(photo);

function Row({ items, from, to, progress }: { items: ReturnType<typeof photo>[]; from: string; to: string; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const reduce = useReducedMotion();
  const x = useTransform(progress, [0, 1], reduce ? ["0%", "0%"] : [from, to]);
  return (
    <motion.ul style={{ x }} className="flex w-max gap-4 md:gap-6">
      {items.map((p) => (
        <li key={p.src} className="group relative h-[34vh] min-h-56 overflow-hidden rounded-xl md:h-[44vh]" style={{ aspectRatio: `${p.width}/${p.height}` }}>
          <Image src={p.src} alt={p.alt} fill sizes="40vw" className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
        </li>
      ))}
    </motion.ul>
  );
}

export function PhotoStrip() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="mx-auto mb-16 flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-end md:px-10">
        <Reveal>
          <p className="eyebrow">In the field</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.95]">
            Where worship meets the street.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <Button href="/gallery" variant="ghost">
            View the gallery
          </Button>
        </Reveal>
      </div>
      <div className="flex flex-col gap-4 md:gap-6">
        <Row items={rowA} from="0%" to="-30%" progress={scrollYProgress} />
        <Row items={rowB} from="-30%" to="0%" progress={scrollYProgress} />
      </div>
    </section>
  );
}
