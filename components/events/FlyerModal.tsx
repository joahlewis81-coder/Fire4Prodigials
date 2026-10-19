"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import type { FlyerEvent } from "@/content/events";
import { formatSession, icsFor, nextSession } from "@/lib/events";
import { lockScroll } from "../SmoothScroll";
import sizes from "@/content/images.json";

const ease = [0.16, 1, 0.3, 1] as const;

export function FlyerModal({ event, now, onClose }: { event: FlyerEvent; now: number; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const size = (sizes as Record<string, { width: number; height: number }>)[event.flyer];
  const session = nextSession(event, now);
  const isPast = event.sessions.every((s) => Date.parse(s.end ?? s.start) < now);
  const upcomingSessions = event.sessions.filter((s) => Date.parse(s.end ?? s.start) >= now);

  useEffect(() => {
    lockScroll(true);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const download = () => {
    const blob = new Blob([icsFor(event, session)], { type: "text/calendar" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${event.slug}.ics`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const share = async () => {
    const url = `${location.origin}/events#${event.slug}`;
    if (navigator.share) await navigator.share({ title: event.title, url }).catch(() => {});
    else await navigator.clipboard?.writeText(url);
  };

  const mapsUrl = event.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.venue}, ${event.address}`)}`
    : null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center" role="dialog" aria-modal aria-label={event.title}>
      <motion.button
        aria-label="Close"
        tabIndex={-1}
        className="absolute inset-0 cursor-zoom-out bg-ink/85 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      <div
        data-lenis-prevent
        className="relative z-10 grid max-h-[100dvh] w-full max-w-6xl grid-cols-1 gap-8 overflow-y-auto p-5 pt-20 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-14 md:p-10"
      >
        <motion.div layoutId={`flyer-${event.slug}`} transition={{ duration: 0.75, ease }} className="relative mx-auto w-fit overflow-hidden rounded-xl shadow-[0_40px_120px_-20px_rgb(242_106_27/0.35)]">
          <Image src={event.flyer} alt={`${event.title} flyer`} width={size.width} height={size.height} className="h-auto max-h-[70dvh] w-auto md:max-h-[86dvh]" priority />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.8, ease } }}
          exit={{ opacity: 0, y: 12, transition: { duration: 0.25 } }}
          className="pb-10 md:pb-0"
        >
          <p className="eyebrow">{isPast ? "Past event" : "Upcoming"}</p>
          <h2 className="mt-3 font-display text-5xl leading-[0.95] md:text-6xl">{event.title}</h2>

          <dl className="mt-8 space-y-5 border-t border-bone/10 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-smoke">When</dt>
              {(upcomingSessions.length ? upcomingSessions : [session]).map((s) => {
                const f = formatSession(s);
                return (
                  <dd key={s.start} className="mt-1 text-lg">
                    {f.day} <span className="text-bone/60">· {f.time}</span>
                  </dd>
                );
              })}
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-smoke">Where</dt>
              <dd className="mt-1 text-lg">
                {event.venue}
                {event.address && <span className="block text-bone/60">{event.address}</span>}
              </dd>
            </div>
          </dl>

          <p className="mt-6 max-w-prose text-bone/75">{event.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {!isPast && (
              <button onClick={download} className="min-h-12 rounded-full bg-ember px-6 font-semibold text-ink transition-colors duration-500 hover:bg-ember-soft">
                Add to calendar
              </button>
            )}
            {mapsUrl && !isPast && (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-full border border-bone/25 px-6 font-semibold transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink">
                Directions
              </a>
            )}
            <button onClick={share} className="min-h-12 rounded-full border border-bone/25 px-6 font-semibold transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink">
              Share
            </button>
          </div>
        </motion.div>

        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close flyer"
          className="fixed right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-bone/20 bg-ink/60 text-2xl backdrop-blur transition-colors hover:bg-bone hover:text-ink md:right-8 md:top-8"
        >
          ×
        </button>
      </div>
    </div>
  );
}
