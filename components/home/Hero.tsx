"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "../Button";
import { site } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, reduce ? 1.08 : 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const line1 = "No one is";
  const line2 = "too far gone.";

  return (
    <section ref={ref} className="grain relative flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-ink">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          <Image
            src="/images/photos/prayer-circle.webp"
            alt="Men kneeling together in prayer, hands on each other's shoulders"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_40%]"
          />
        </motion.div>
      </motion.div>

      {/* Darken for legibility, warm the bottom edge */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
      <div className="ember-glow" />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 md:px-10 md:pb-24">
        <motion.p
          className="eyebrow"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
        >
          Fire4Prodigals · Hope · Recovery · Prayer
        </motion.p>

        <h1 className="mt-6 font-display text-[clamp(3.6rem,11vw,10rem)] leading-[0.88] tracking-[-0.02em]">
          {[line1, line2].map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={`block ${li === 1 ? "italic text-ember-soft" : ""}`}
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.4, delay: 0.45 + li * 0.15, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-8 flex max-w-xl flex-col gap-8 md:mt-10"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease }}
        >
          <p className="text-lg text-bone/80 md:text-xl">
            Prayer, encouragement, recovery support, and real connection for people who feel far from home.
            Everyone is welcome. Come as you are.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/events">See upcoming events</Button>
            <Button href={site.donateUrl} external variant="ghost">
              Give
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute bottom-8 right-10 z-10 hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-bone/50 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-bone/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-ember"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
