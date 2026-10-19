import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, RevealWords } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { photo } from "@/content/gallery";

export const metadata: Metadata = {
  title: "About",
  description: "Fire4Prodigals was founded by Brandon & Melody Hamilton to bring hope, prayer, and recovery support to people who feel far from home.",
};

const scenes = ["worship-hands-raised", "prayer-under-tent", "speaking-classroom"].map(photo);

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Bringing the prodigals home." />

      <section className="bg-paper py-28 text-ink md:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 md:grid-cols-[1fr_1.1fr] md:gap-24 md:px-10">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bone">
            <Image src="/images/photos/outreach-team.webp" alt="Fire4Prodigals team members at an outreach event" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </Reveal>
          <div className="md:pt-10">
            <Reveal>
              <p className="eyebrow !text-flame">Our story</p>
            </Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,4.5vw,4rem)] leading-[1]">
              <RevealWords text="Like the father in Luke 15, we run toward the ones who are still a long way off." />
            </h2>
            <Reveal delay={0.2}>
              {/* DRAFT COPY: replace with the ministry's own story. */}
              <div className="mt-8 space-y-5 text-lg text-ink/70">
                <p>
                  Fire4Prodigals was started by Brandon & Melody Hamilton to carry the hope of Jesus to people in their
                  hardest seasons: those fighting addiction, those walking through recovery, and anyone who feels too far
                  gone to come home.
                </p>
                <p>
                  Based in North Carolina, the ministry shows up at outreach days, worship nights, recovery meetings, and
                  community events all over the US, offering prayer, encouragement, and connections to real resources.
                </p>
              </div>
              <p className="mt-8 rounded-lg border border-dashed border-flame/40 px-4 py-3 text-sm text-flame">
                Draft text. Send us your story in your own words and we’ll put it here.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {scenes.map((p, i) => (
              <Reveal key={p.src} delay={i * 0.1} className={`relative overflow-hidden rounded-2xl ${i === 1 ? "md:mt-20" : ""}`}>
                <div className="relative aspect-[3/4]">
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-28 max-w-3xl text-center">
            <Reveal>
              <p className="font-display text-[clamp(2rem,4vw,3.4rem)] italic leading-tight">
                “So if the Son sets you free, you will be free indeed.”
              </p>
              <p className="mt-5 text-sm uppercase tracking-[0.2em] text-smoke">John 8:36</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-wrap justify-center gap-3">
                <Button href="/events">Join us at an event</Button>
                <Button href="/contact" variant="ghost">
                  Get involved
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
