import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Volunteer, request prayer, invite Fire4Prodigals to your event, or get in touch.",
};

const ways = [
  { title: "Volunteer", body: "Serve at outreach days, set up resource tables, or pray with people at events." },
  { title: "Invite us", body: "Bring Fire4Prodigals to your church, recovery group, or community event." },
  { title: "Ask for prayer", body: "Whatever you’re carrying, you don’t have to carry it alone." },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Get involved" title="There’s a place for you here." />
      <section className="bg-ink pb-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 md:grid-cols-[1fr_1.2fr] md:gap-24 md:px-10">
          <div>
            <ul className="divide-y divide-bone/10 border-y border-bone/10">
              {ways.map((w, i) => (
                <Reveal as="li" key={w.title} delay={i * 0.08} className="py-7">
                  <h2 className="font-display text-3xl">{w.title}</h2>
                  <p className="mt-2 text-bone/65">{w.body}</p>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2}>
              <div className="mt-12 space-y-2">
                <p className="eyebrow">Call or text</p>
                <a href={site.phoneHref} className="block font-display text-4xl transition-colors hover:text-ember-soft">
                  {site.phone}
                </a>
                <p className="text-bone/60">{site.founders}</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
