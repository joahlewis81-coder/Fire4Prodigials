import Image from "next/image";
import { Reveal, RevealWords } from "../Reveal";
import { Button } from "../Button";

const pillars = [
  { n: "01", title: "Recovery placement", body: "Helping men and women find faith-based recovery and life-transformation programs, from about 65 days to 12 months, that fit their needs." },
  { n: "02", title: "Clearing the way", body: "Help with applications, admission requirements, transportation, and the financial barriers between a person in crisis and real help." },
  { n: "03", title: "Walking alongside", body: "Prayer, discipleship, advocacy, and continued relationship as people begin rebuilding their lives." },
  { n: "04", title: "Outreach & partners", body: "Serving the community with churches, recovery ministries, treatment facilities, and local organizations." },
];

export function Mission() {
  return (
    <section className="relative bg-paper py-28 text-ink md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.2fr_1fr] md:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow !text-flame">Our mission</p>
            </Reveal>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.2vw,4.8rem)] leading-[0.98] tracking-[-0.01em]">
              <RevealWords text="He lifts. He restores. He gives rest." />
            </h2>
          </div>
          <Reveal delay={0.2} className="md:pt-14">
            <blockquote className="border-l border-ink/15 pl-6">
              <p className="font-display text-2xl italic leading-snug md:text-3xl">
                “Come unto me, all ye that labour and are heavy laden, and I will give you rest.”
              </p>
              <cite className="mt-4 block text-sm not-italic uppercase tracking-[0.2em] text-ink/50">Matthew 11:28 (KJV)</cite>
            </blockquote>
            <p className="mt-8 text-ink/70">
              Fire4Prodigals is a Christ-centered nonprofit ministry founded by Brandon Hamilton, with a heart for the
              broken, the addicted, the incarcerated, and the forgotten. No one is too far gone for the love, grace, and
              restoring power of Jesus Christ.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="dark">
                Our story
              </Button>
            </div>
          </Reveal>
        </div>

        <ol className="mt-24 grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.n} as="li" delay={i * 0.08} className="group bg-paper p-8 transition-colors duration-700 hover:bg-bone md:p-10">
              <span className="text-sm font-semibold text-flame">{p.n}</span>
              <h3 className="mt-10 font-display text-3xl">{p.title}</h3>
              <p className="mt-3 text-[0.95rem] text-ink/65">{p.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="mx-auto mt-28 max-w-7xl px-5 md:px-10">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[16/10] md:aspect-[2/1]">
          <Image
            src="/images/photos/night-baptism.webp"
            alt="A baptism at night in a water trough under string lights"
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-[50%_58%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 font-display text-3xl italic text-bone md:bottom-10 md:left-10 md:text-5xl">
            “He brought me up out of the pit.”
            <span className="ml-3 align-middle font-sans text-xs not-italic uppercase tracking-[0.2em] text-bone/60">Psalm 40:2</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
