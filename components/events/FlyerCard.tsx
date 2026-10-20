"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { FlyerEvent } from "@/content/events";
import { formatDate, nextSession } from "@/lib/events";
import { flyerSize } from "@/lib/flyerSize";

export function FlyerCard({ event, now, onOpen, past, ghost }: { event: FlyerEvent; now: number; onOpen: () => void; past?: boolean; ghost?: boolean }) {
  const size = flyerSize(event);
  const s = nextSession(event, now);
  return (
    <button onClick={onOpen} className="group block w-full cursor-zoom-in text-left" aria-label={`Open ${event.title} flyer`}>
      <motion.div
        layoutId={ghost ? undefined : `flyer-${event.slug}`}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-xl bg-ash"
      >
        <Image
          src={event.flyer}
          alt={`${event.title} flyer`}
          width={size.width}
          height={size.height}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className={`h-auto w-full transition-[transform,filter] duration-[1.2s] ease-out-expo group-hover:scale-[1.03] ${past ? "grayscale-[0.6] group-hover:grayscale-0" : ""}`}
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-bone/10 transition-shadow duration-700 group-hover:ring-ember/60" />
      </motion.div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl leading-tight transition-colors duration-500 group-hover:text-ember-soft">{event.title}</h3>
        <p className="shrink-0 text-sm text-smoke">
          {formatDate(s.start, { month: "short", day: "numeric", ...(past ? { year: "numeric" } : {}) })}
        </p>
      </div>
    </button>
  );
}
