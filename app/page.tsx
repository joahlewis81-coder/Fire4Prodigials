import { Hero } from "@/components/home/Hero";
import { NextEvent } from "@/components/home/NextEvent";
import { Mission } from "@/components/home/Mission";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { GiveCta } from "@/components/home/GiveCta";
import { events } from "@/content/events";

export default function Home() {
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
