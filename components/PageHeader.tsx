import { Reveal, RevealWords } from "./Reveal";

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="grain relative overflow-hidden bg-ink pb-16 pt-40 md:pb-24 md:pt-52">
      <div className="ember-glow opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.02em]">
          <RevealWords text={title} />
        </h1>
        {intro && (
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg text-bone/70">{intro}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
