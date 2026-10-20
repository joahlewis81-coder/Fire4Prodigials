"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import type { FlyerEvent } from "@/content/events";
import { splitEvents } from "@/lib/events";
import { FlyerCard } from "./FlyerCard";
import { FlyerModal } from "./FlyerModal";
import { Portal } from "../Portal";
import { useNow } from "./useNow";

export function EventsBoard({ events, builtAt }: { events: FlyerEvent[]; builtAt: number }) {
  const now = useNow(builtAt);
  const { upcoming, past } = splitEvents(events, now);
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const list = tab === "upcoming" ? upcoming : past;
  const open = events.find((e) => e.slug === openSlug);
  const close = useCallback(() => {
    setOpenSlug(null);
    history.replaceState(null, "", location.pathname);
  }, []);

  // Open a flyer directly from a shared link like /events#freedom-fest-2026
  useEffect(() => {
    const slug = location.hash.slice(1);
    const e = events.find((x) => x.slug === slug);
    if (e) {
      setTab(splitEvents(events).past.includes(e) ? "past" : "upcoming");
      setOpenSlug(slug);
    }
  }, [events]);

  const openEvent = (slug: string) => {
    setOpenSlug(slug);
    history.replaceState(null, "", `#${slug}`);
  };

  return (
    <LayoutGroup>
      <div className="flex gap-2" role="tablist" aria-label="Event timing">
        {(["upcoming", "past"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`relative min-h-11 rounded-full px-6 text-sm font-semibold capitalize transition-colors duration-500 ${tab === t ? "text-ink" : "text-bone/70 hover:text-bone"}`}
          >
            {tab === t && (
              <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
            )}
            <span className="relative">
              {t} <span className="opacity-50">({t === "upcoming" ? upcoming.length : past.length})</span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          {list.length === 0 ? (
            <p className="py-24 text-center font-display text-3xl text-bone/60">
              New events are on the way. Check back soon.
            </p>
          ) : (
            <ul className="grid grid-cols-1 items-start gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((e, i) => (
                <motion.li
                  key={e.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {openSlug === e.slug ? (
                    <div className="invisible"><FlyerCard event={e} now={now} onOpen={() => {}} past={tab === "past"} ghost /></div>
                  ) : (
                    <FlyerCard event={e} now={now} onOpen={() => openEvent(e.slug)} past={tab === "past"} />
                  )}
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>

      <Portal>
        <AnimatePresence>{open && <FlyerModal key={open.slug} event={open} now={now} onClose={close} />}</AnimatePresence>
      </Portal>
    </LayoutGroup>
  );
}
