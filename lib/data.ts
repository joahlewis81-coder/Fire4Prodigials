import { events as builtIn, type FlyerEvent } from "@/content/events";
import { supabase, type EventRow } from "./supabase";

export function rowToEvent(r: EventRow): FlyerEvent {
  return {
    slug: r.slug,
    title: r.title,
    flyer: r.flyer_url,
    width: r.flyer_width,
    height: r.flyer_height,
    sessions: (r.sessions ?? [])
      .filter((s) => s?.start)
      .map((s) => ({ start: s.start, ...(s.end ? { end: s.end } : {}) }))
      .sort((a, b) => Date.parse(a.start) - Date.parse(b.start)),
    venue: r.venue,
    address: r.address,
    summary: r.summary,
    ...(r.link ? { link: r.link } : {}),
  };
}

/**
 * All events. Reads from Supabase when it's connected, otherwise uses the
 * flyers built into the site. If Supabase is unreachable, falls back too,
 * so the Events page never goes blank.
 */
export async function getEvents(): Promise<FlyerEvent[]> {
  const db = supabase();
  if (!db) return builtIn;
  const { data, error } = await db.from("events").select("*");
  if (error || !data) {
    console.error("Could not load events from Supabase:", error?.message);
    return builtIn;
  }
  return (data as EventRow[]).map(rowToEvent).filter((e) => e.sessions.length > 0);
}
