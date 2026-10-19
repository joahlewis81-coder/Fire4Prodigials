import { site } from "@/content/site";
import { Button } from "../Button";
import { Reveal, RevealWords } from "../Reveal";

export function GiveCta() {
  return (
    <section className="grain relative overflow-hidden bg-ash py-32 md:py-44">
      <div className="ember-glow" />
      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
        <Reveal>
          <p className="eyebrow">Fuel the fire</p>
        </Reveal>
        <h2 className="mt-6 font-display text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.92]">
          <RevealWords text="Every gift sends hope" />
          <br />
          <RevealWords text="further down the road." className="italic text-ember-soft" delay={0.2} />
        </h2>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-bone/70">
            Your support keeps outreach tents up, resource tables stocked, and the team on the road to the people who need it
            most.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={site.donateUrl} external>
              Donate
            </Button>
            <Button href="/contact" variant="ghost">
              Volunteer with us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
