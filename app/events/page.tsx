import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EventsBoard } from "@/components/events/EventsBoard";
import { events } from "@/content/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming Fire4Prodigals outreach events, worship nights, and recovery gatherings.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Come as you are."
        intro="Outreach days, worship nights, and recovery gatherings across North Carolina and beyond. Tap any flyer for details."
      />
      <section className="bg-ink pb-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <EventsBoard events={events} builtAt={Date.now()} />
        </div>
      </section>
    </>
  );
}
