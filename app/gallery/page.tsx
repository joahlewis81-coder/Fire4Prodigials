import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Fire4Prodigals outreach events, worship nights, and baptisms.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Moments of freedom." intro="Prayer, worship, baptisms, and outreach. A few of the moments we’ve been part of." />
      <section className="bg-ink pb-32">
        <div className="mx-auto max-w-7xl px-3 md:px-10">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
