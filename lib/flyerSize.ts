import type { FlyerEvent } from "@/content/events";
import sizes from "@/content/images.json";

const known = sizes as Record<string, { width: number; height: number }>;

/** Pixel size of an event's flyer, so the page can reserve space before it loads. */
export function flyerSize(e: FlyerEvent) {
  if (e.width && e.height) return { width: e.width, height: e.height };
  return known[e.flyer] ?? { width: 1080, height: 1350 };
}
