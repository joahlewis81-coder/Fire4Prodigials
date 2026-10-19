import type { EventSession, FlyerEvent } from "@/content/events";

const TZ = "America/New_York";

/** The event's last moment: the latest session's end (or start + 3h). */
function lastMoment(e: FlyerEvent) {
  return Math.max(
    ...e.sessions.map((s) =>
      s.end ? Date.parse(s.end) : Date.parse(s.start) + 3 * 3600_000,
    ),
  );
}

/** The next session that hasn't ended yet, or the final one if all are past. */
export function nextSession(e: FlyerEvent, now = Date.now()): EventSession {
  const upcoming = e.sessions.find(
    (s) => (s.end ? Date.parse(s.end) : Date.parse(s.start) + 3 * 3600_000) > now,
  );
  return upcoming ?? e.sessions[e.sessions.length - 1];
}

export function splitEvents(all: FlyerEvent[], now = Date.now()) {
  const upcoming = all
    .filter((e) => lastMoment(e) > now)
    .sort((a, b) => Date.parse(nextSession(a, now).start) - Date.parse(nextSession(b, now).start));
  const past = all
    .filter((e) => lastMoment(e) <= now)
    .sort((a, b) => lastMoment(b) - lastMoment(a));
  return { upcoming, past };
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...opts }).format(new Date(iso));
}

export function formatSession(s: EventSession) {
  const day = formatDate(s.start, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const t = (iso: string) =>
    formatDate(iso, { hour: "numeric", minute: "2-digit" }).replace(":00", "");
  return { day, time: s.end ? `${t(s.start)} – ${t(s.end)}` : t(s.start) };
}

/** Builds an .ics calendar file for one session so visitors can save it. */
export function icsFor(e: FlyerEvent, s: EventSession) {
  const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = s.end ?? new Date(Date.parse(s.start) + 2 * 3600_000).toISOString();
  const esc = (v: string) => v.replace(/[,;\\]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fire4Prodigals//Events//EN",
    "BEGIN:VEVENT",
    `UID:${e.slug}-${stamp(s.start)}@fire4prodigals.com`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(s.start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(e.title)}`,
    `LOCATION:${esc([e.venue, e.address].filter(Boolean).join(", "))}`,
    `DESCRIPTION:${esc(e.summary)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
