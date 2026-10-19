"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { FlyerEvent } from "@/content/events";
import { formatDate, formatSession, nextSession, splitEvents } from "@/lib/events";
import { useNow } from "../events/useNow";
import { Reveal, RevealWords } from "../Reveal";
import { Button } from "../Button";
import sizes from "@/content/images.json";

export function NextEvent({ events, builtAt }: { events: FlyerEvent[]; builtAt: number }) {
  const now = useNow(builtAt);
  const { upcoming } = splitEvents(events, now);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-4, 3]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-8%"]);

  const next = upcoming[0];
  const after = upcoming.slice(1, 3);
  if (!next) return null;

  const s = nextSession(next, now);
  const f = formatSession(s);
  const size = (sizes as Record<string, { width: number; height: number }>)[next.flyer];

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:grid-cols-[1fr_1.05fr] md:px-10">
        <div className="order-2 md:order-1">
          <Reveal>
            <p className="eyebrow">Next gathering</p>
          </Reveal>
          <h2 className="mt-5 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.92]">
            <RevealWords text={next.title} />
          </h2>

          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-[auto_1fr] gap-x-8 gap-y-6 border-t border-bone/10 pt-8">
              <div className="row-span-2 flex flex-col items-center justify-center rounded-2xl border border-ember/40 px-5 py-4 text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">
                  {formatDate(s.start, { month: "short" })}
                </span>
                <span className="font-display text-6xl leading-none">{formatDate(s.start, { day: "numeric" })}</span>
              </div>
              <p className="self-end text-lg">
                {f.day}
                <span className="block text-bone/60">{f.time}</span>
              </p>
              <p className="text-bone/60">
                {next.venue}
                {next.address && <span className="block">{next.address}</span>}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8 max-w-lg text-bone/75">{next.summary}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={`/events#${next.slug}`}>View flyer & details</Button>
              <Button href="/events" variant="ghost">
                All events
              </Button>
            </div>
          </Reveal>

          {after.length > 0 && (
            <Reveal delay={0.35}>
              <div className="mt-14">
                <p className="text-xs uppercase tracking-[0.2em] text-smoke">Also coming up</p>
                <ul className="mt-4 divide-y divide-bone/10 border-y border-bone/10">
                  {after.map((e) => (
                    <li key={e.slug}>
                      <Link href={`/events#${e.slug}`} className="group flex items-center justify-between gap-4 py-4">
                        <span className="font-display text-2xl transition-colors duration-500 group-hover:text-ember-soft">{e.title}</span>
                        <span className="shrink-0 text-sm text-bone/60">
                          {formatDate(nextSession(e, now).start, { month: "short", day: "numeric" })}
                          <span className="ml-3 inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>

        <motion.div style={{ rotate, y }} className="order-1 mx-auto w-full max-w-md md:order-2 md:max-w-none">
          <Reveal y={60}>
            <Link href={`/events#${next.slug}`} className="group relative block">
              <div className="absolute -inset-10 rounded-full bg-ember/25 blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-70" />
              <Image
                src={next.flyer}
                alt={`${next.title} flyer`}
                width={size.width}
                height={size.height}
                sizes="(min-width: 768px) 45vw, 90vw"
                className="relative h-auto w-full rounded-xl shadow-2xl ring-1 ring-bone/10 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.02]"
              />
            </Link>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
