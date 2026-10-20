import { Hero } from "@/components/home/Hero";
import { NextEvent } from "@/components/home/NextEvent";
import { Mission } from "@/components/home/Mission";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { GiveCta } from "@/components/home/GiveCta";
import { getEvents } from "@/lib/data";

// Re-check for new flyers at most once a minute.
export const revalidate = 60;

export default async function Home() {
  const events = await getEvents();
  const builtAt = Date.now();
  return (
    <>
      <Hero />
      <NextEvent events={events} builtAt={builtAt} />
      <Mission />
      <PhotoStrip />
      <GiveCta />
    </>
  );
}
