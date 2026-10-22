import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, RevealWords } from "@/components/Reveal";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fire4Prodigals is a Christ-centered nonprofit ministry founded by Brandon Hamilton for the broken, the addicted, the incarcerated, and the forgotten. No one is too far gone.",
};

const help = [
  "Finding faith-based recovery and life-transformation programs, from about 65 days to 12 months, that fit each person’s circumstances",
  "Treatment applications and admission requirements",
  "Transportation and financial barriers",
  "Prayer, discipleship, and advocacy",
  "Community outreach",
  "Continued relationship as people rebuild their lives",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Fire4Prodigals" title="Bringing the prodigals home." intro="He lifts. He restores. He gives rest." />

      {/* Belief */}
      <section className="bg-paper py-24 text-ink md:py-36">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <Reveal>
            <p className="eyebrow !text-flame">Why we exist</p>
          </Reveal>
          <p className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02]">
            <RevealWords text="Fire4Prodigals was born out of a simple belief: no one is too far gone for the love, grace, and restoring power of Jesus Christ." />
          </p>
          <Reveal delay={0.15}>
            <p className="mt-8 font-display text-3xl italic text-flame">We believe that because we’ve lived it.</p>
            <p className="mt-8 max-w-2xl text-lg text-ink/70">
              Founded by Brandon Hamilton, Fire4Prodigals is a Christ-centered nonprofit ministry with a heart for the
              broken, the addicted, the incarcerated, the forgotten, and those who have lost hope that their lives can ever
              be different. Our mission is rooted in the very things God has brought us through.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Our story */}
      <section className="bg-ink py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95]">
              What the world wrote off, God saw as worth redeeming.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
            <Reveal className="relative aspect-[3/4] overflow-hidden rounded-2xl md:sticky md:top-28 md:self-start">
              <Image
                src="/images/photos/celebrate-recovery-testimony.webp"
                alt="Brandon Hamilton sharing his testimony at Celebrate Recovery"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </Reveal>

            <div className="space-y-16">
              <Reveal as="div">
                <h3 className="font-display text-4xl">Brandon</h3>
                <div className="mt-5 space-y-5 text-lg text-bone/75">
                  <p>
                    Brandon Hamilton knows what it means to live in bondage. His testimony includes addiction, gang
                    involvement, surviving being shot and stabbed, and spending 12 years in prison. His life was filled
                    with violence, destruction, and choices that nearly cost him everything.
                  </p>
                  <p className="font-display text-2xl italic text-bone">But his story didn’t end there.</p>
                  <p>
                    One encounter with Jesus Christ changed the direction of his life. What the world may have written off
                    as a lost cause, God saw as a life worth redeeming. Today, Brandon is sharing the Gospel, preaching the
                    Word, praying with the broken, and walking alongside people who are fighting many of the same battles
                    he once faced.
                  </p>
                </div>
              </Reveal>

              <Reveal as="div">
                <h3 className="font-display text-4xl">Melody</h3>
                <div className="mt-5 space-y-5 text-lg text-bone/75">
                  <p>
                    Melody Hamilton’s testimony is one of deliverance, long-term recovery, and restoration. Having walked
                    through addiction, abuse, and many other dark places, she knows firsthand what it means to be bound by
                    things far beyond a substance.
                  </p>
                  <p>
                    Today, delivered and set free through Jesus Christ, she has a heart for those who feel trapped,
                    broken, or forgotten, and a passion for helping others discover the same freedom and restoration she
                    has found in Him.
                  </p>
                </div>
              </Reveal>

              <Reveal as="div" className="border-t border-bone/10 pt-10">
                <p className="text-lg text-bone/75">
                  Together, we understand the darkness of bondage, the consequences of our choices, and the difficult road
                  of rebuilding a life.
                </p>
                <p className="mt-5 font-display text-3xl leading-snug">
                  But more importantly, we know the power of a surrendered life and what Jesus Christ can do with the pieces
                  of a broken one.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The name */}
      <section className="bg-paper py-24 text-ink md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <p className="eyebrow !text-flame">The heart behind the name</p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95]">
              He didn’t turn him away. He ran to meet him.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-20">
            <Reveal as="div" className="space-y-5 text-lg text-ink/75">
              <p>
                The name Fire4Prodigals is rooted in the parable of the prodigal son found in Luke 15. The prodigal son
                walked away from his father’s house, wasted what he had been given, and eventually found himself in a
                place of desperation and brokenness.
              </p>
              <p>
                But when he finally came to himself and made the decision to return home, something beautiful happened.
                His father didn’t wait for his son to clean himself up, prove his worth, or earn his way back into the
                family. He met him with compassion, embraced him, and welcomed him home.
              </p>
              <p className="font-display text-2xl italic text-ink">That is the heart of our ministry.</p>
            </Reveal>
            <Reveal as="div" delay={0.1} className="space-y-5 text-lg text-ink/75">
              <p>
                We know there are people still sitting in their own version of the pigpen. People bound by addiction,
                shame, abuse, destructive choices, and circumstances they cannot see their way out of.
              </p>
              <p>But we also know that the Father’s love has not changed.</p>
              <p>
                The same Father who welcomed the prodigal home is still calling His children out of darkness and into His
                marvelous light.
              </p>
            </Reveal>
          </div>

          {/* Dalet */}
          <Reveal className="mt-20 overflow-hidden rounded-3xl bg-ink text-bone">
            <div className="grid items-center gap-10 p-8 md:grid-cols-[auto_1fr] md:gap-16 md:p-14">
              <div className="relative mx-auto flex h-48 w-48 items-center justify-center md:h-64 md:w-64">
                <div className="absolute inset-0 rounded-full bg-ember/25 blur-3xl" />
                <span
                  lang="he"
                  aria-label="Dalet, the fourth letter of the Hebrew alphabet"
                  className="relative font-serif text-[9rem] leading-none text-ember-soft md:text-[12rem]"
                >
                  ד
                </span>
              </div>
              <div>
                <p className="eyebrow">Why the 4</p>
                <div className="mt-5 space-y-4 text-lg text-bone/75">
                  <p>
                    In Hebrew, the fourth letter of the alphabet is Dalet (ד), which carries the numerical value of four.
                    Its name is associated with a door, while Jewish teachings also connect it with the poor or needy
                    person and the posture of humility.
                  </p>
                  <p>
                    A door represents an opening. A passage from one place to another. The opportunity to leave behind
                    what once held us captive and step into something new. And just like the prodigal son, sometimes we
                    have to come to the end of ourselves, humble our hearts, and make the decision to walk through that
                    door.
                  </p>
                </div>
                <blockquote className="mt-8 border-l border-ember/50 pl-6">
                  <p className="font-display text-2xl italic leading-snug md:text-3xl">
                    “I am the door: by me if any man enter in, he shall be saved…”
                  </p>
                  <cite className="mt-3 block text-sm not-italic uppercase tracking-[0.2em] text-bone/50">John 10:9 (KJV)</cite>
                </blockquote>
                <p className="mt-8 text-lg text-bone">
                  Jesus is the door. We simply want to help people find their way to Him. That is what Fire4Prodigals
                  represents to us: a ministry pointing people toward the open door of salvation, deliverance, restoration,
                  and a new life in Jesus Christ.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="grain relative overflow-hidden bg-ink py-24 md:py-36">
        <div className="ember-glow opacity-50" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-14 md:grid-cols-[1fr_1fr] md:gap-20">
            <Reveal as="div">
              <p className="eyebrow">Our vision</p>
              <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95]">
                Lives transformed through Jesus Christ.
              </h2>
              <div className="mt-8 space-y-5 text-lg text-bone/75">
                <p>
                  Our vision has never been simply to get someone sober, put them in a program, or meet a temporary need.
                  We believe true freedom goes beyond overcoming addiction. It involves healing from the things that kept
                  us bound, breaking destructive cycles, rebuilding families, and discovering a new identity in Christ.
                </p>
                <p>
                  Sometimes that begins with helping someone enter a long-term recovery program. Sometimes it means
                  answering a phone call in the middle of the night, sitting beside someone in a hospital, providing
                  transportation, or helping someone escape a dangerous situation.
                </p>
                <p className="font-display text-2xl italic text-bone">
                  And sometimes it is simply being the person who refuses to give up on someone when everyone else has
                  walked away.
                </p>
              </div>
            </Reveal>

            <Reveal as="div" delay={0.1} className="md:pt-24">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">How we help</p>
              <ul className="mt-5 divide-y divide-bone/10 border-y border-bone/10">
                {help.map((h) => (
                  <li key={h} className="flex gap-4 py-4 text-bone/85">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-lg text-bone/75">
                We partner with churches, recovery ministries, treatment facilities, and community organizations because
                we believe the Body of Christ is called to do more than talk about love.
              </p>
              <p className="mt-4 font-display text-3xl text-ember-soft">We are called to demonstrate it.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-paper py-24 text-ink md:py-36">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <Reveal>
            <p className="eyebrow !text-flame">Why we do what we do</p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98]">
              We haven’t forgotten where God found us.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-lg text-ink/75">
              <p>
                We haven’t forgotten the darkness, the brokenness, the consequences, or the people who prayed for us when we
                couldn’t see a way forward. And we haven’t forgotten what it feels like to need grace.
              </p>
              <p>
                We believe the same Jesus who brought us out is still bringing people out today. Every person has a story.
                Every person has value. And no matter how far someone has fallen, we believe there is still hope through
                Jesus Christ.
              </p>
              <p>
                We can’t make someone surrender. We can’t make someone choose recovery. And we can’t walk the road for
                them.
              </p>
              <p className="font-display text-3xl leading-snug text-ink">
                But we can love them, point them toward Jesus, and make sure they know they don’t have to walk it alone.
              </p>
              <p>That’s why we do what we do. That’s why Fire4Prodigals exists.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="grain relative overflow-hidden bg-ash py-28 md:py-40">
        <div className="ember-glow" />
        <div className="relative mx-auto max-w-4xl px-5 text-center md:px-10">
          <Reveal>
            <p className="eyebrow">Bringing the prodigals home</p>
            <p className="mt-8 font-display text-[clamp(2rem,4.5vw,3.6rem)] italic leading-tight">
              “Come unto me, all ye that labour and are heavy laden, and I will give you rest.”
            </p>
            <p className="mt-5 text-sm uppercase tracking-[0.2em] text-smoke">Matthew 11:28 (KJV)</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-12 max-w-2xl text-lg text-bone/75">
              Our prayer is that every person we serve encounters the love of Jesus Christ and discovers that their past
              does not have to determine their future. We’re not here because we have it all figured out. We’re here
              because we know the One who brought us out.
            </p>
            <p className="mt-6 font-display text-3xl text-ember-soft">And we’re committed to helping others find their way home.</p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Button href="/contact">Reach out for help</Button>
              <Button href="/events" variant="ghost">
                Join us at an event
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
