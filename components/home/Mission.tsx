import Image from "next/image";
import { Reveal, RevealWords } from "../Reveal";
import { Button } from "../Button";

const pillars = [
  { n: "01", title: "Prayer", body: "We kneel with people right where they are, at outreach tents, on street corners, and in recovery rooms." },
  { n: "02", title: "Encouragement", body: "Real conversation and a hope-filled message for anyone carrying hurts, habits, or hang-ups." },
  { n: "03", title: "Recovery support", body: "Walking alongside people in addiction recovery, with dignity and without judgment." },
  { n: "04", title: "Resource connections", body: "Connecting neighbors to food, health services, and community programs that can help." },
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
              <RevealWords text="Carrying the fire of God’s love to the prodigals, and bringing them home." />
            </h2>
          </div>
          <Reveal delay={0.2} className="md:pt-14">
            <blockquote className="border-l border-ink/15 pl-6">
              <p className="font-display text-2xl italic leading-snug md:text-3xl">
                “Come to me, all who are weary and heavy burdened, and I will give you rest.”
              </p>
              <cite className="mt-4 block text-sm not-italic uppercase tracking-[0.2em] text-ink/50">Matthew 11:28</cite>
            </blockquote>
            <p className="mt-8 text-ink/70">
              Founded by Brandon & Melody Hamilton, Fire4Prodigals is based in North Carolina and travels all over the
              US to meet people in their hardest seasons with the hope of Jesus.
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
