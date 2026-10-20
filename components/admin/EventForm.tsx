"use client";

import { useEffect, useMemo, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { FLYER_BUCKET, type EventRow } from "@/lib/supabase";
import { prepareFlyer, slugify } from "@/lib/flyerUpload";
import { ghostBtn, inputCls, labelCls, primaryBtn } from "./ui";

type DateRow = { date: string; start: string; end: string };

const pad = (n: number) => String(n).padStart(2, "0");
const TZ = "America/New_York";

/** Wall-clock parts of a moment, as seen in Eastern time. */
function easternParts(ms: number) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
      .formatToParts(new Date(ms))
      .map((p) => [p.type, p.value]),
  );
  return { y: +parts.year, m: +parts.month, d: +parts.day, h: +parts.hour, min: +parts.minute };
}

/** How far Eastern time is from UTC at a given moment (handles daylight saving). */
function easternOffset(ms: number) {
  const p = easternParts(ms);
  return Date.UTC(p.y, p.m - 1, p.d, p.h, p.min) - Math.floor(ms / 60000) * 60000;
}

/** ISO time → the date/time boxes, always shown in Eastern time. */
function toInputs(iso?: string | null) {
  if (!iso) return { date: "", time: "" };
  const p = easternParts(Date.parse(iso));
  return { date: `${p.y}-${pad(p.m)}-${pad(p.d)}`, time: `${pad(p.h)}:${pad(p.min)}` };
}

/** The date/time boxes (Eastern time) → an exact moment, no matter where the volunteer is. */
function toIso(date: string, time: string) {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);
  const wall = Date.UTC(y, m - 1, d, h, min);
  let ms = wall - easternOffset(wall);
  ms = wall - easternOffset(ms);
  return new Date(ms).toISOString();
}

export function EventForm({
  db,
  existing,
  takenSlugs,
  onCancel,
  onSaved,
}: {
  db: SupabaseClient;
  existing?: EventRow;
  takenSlugs: string[];
  onCancel: () => void;
  onSaved: (title: string) => void;
}) {
  const [title, setTitle] = useState(existing?.title ?? "");
  const [venue, setVenue] = useState(existing?.venue ?? "");
  const [address, setAddress] = useState(existing?.address ?? "");
  const [summary, setSummary] = useState(existing?.summary ?? "");
  const [link, setLink] = useState(existing?.link ?? "");
  const [dates, setDates] = useState<DateRow[]>(
    existing?.sessions.length
      ? existing.sessions.map((s) => ({ date: toInputs(s.start).date, start: toInputs(s.start).time, end: toInputs(s.end).time }))
      : [{ date: "", start: "", end: "" }],
  );
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const preview = useMemo(() => (file ? URL.createObjectURL(file) : existing?.flyer_url ?? ""), [file, existing]);
  useEffect(() => () => {
    if (file) URL.revokeObjectURL(preview);
  }, [file, preview]);

  const setDate = (i: number, patch: Partial<DateRow>) => setDates((d) => d.map((row, j) => (j === i ? { ...row, ...patch } : row)));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!existing && !file) return setError("Please choose a flyer image.");
    const filled = dates.filter((d) => d.date && d.start);
    if (!filled.length) return setError("Please add at least one date and start time.");
    if (filled.some((d) => d.end && d.end <= d.start)) return setError("An end time is earlier than its start time.");

    setSaving(true);
    try {
      const sessions = filled
        .map((d) => ({ start: toIso(d.date, d.start), end: d.end ? toIso(d.date, d.end) : null }))
        .sort((a, b) => Date.parse(a.start) - Date.parse(b.start));

      let slug = existing?.slug;
      if (!slug) {
        const base = `${slugify(title) || "event"}-${filled[0].date}`;
        slug = takenSlugs.includes(base) ? `${base}-${Math.random().toString(36).slice(2, 6)}` : base;
      }

      let flyer = existing
        ? { flyer_url: existing.flyer_url, flyer_width: existing.flyer_width, flyer_height: existing.flyer_height }
        : null;
      let oldPath: string | null = null;

      if (file) {
        const { blob, width, height } = await prepareFlyer(file);
        const path = `${slug}-${Date.now()}.webp`;
        const up = await db.storage.from(FLYER_BUCKET).upload(path, blob, { contentType: "image/webp", cacheControl: "31536000" });
        if (up.error) throw new Error(`Upload failed: ${up.error.message}`);
        const { data } = db.storage.from(FLYER_BUCKET).getPublicUrl(path);
        flyer = { flyer_url: data.publicUrl, flyer_width: width, flyer_height: height };
        const marker = `/storage/v1/object/public/${FLYER_BUCKET}/`;
        const i = existing?.flyer_url.indexOf(marker) ?? -1;
        if (existing && i >= 0) oldPath = decodeURIComponent(existing.flyer_url.slice(i + marker.length));
      }

      const record = {
        slug,
        title: title.trim(),
        venue: venue.trim(),
        address: address.trim(),
        summary: summary.trim(),
        link: link.trim() || null,
        sessions,
        ...flyer!,
      };
      const res = existing
        ? await db.from("events").update(record).eq("id", existing.id)
        : await db.from("events").insert(record);
      if (res.error) throw new Error(res.error.message);
      if (oldPath) await db.storage.from(FLYER_BUCKET).remove([oldPath]);
      onSaved(record.title);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save}>
      <button type="button" onClick={onCancel} className="text-sm text-bone/60 hover:text-bone">
        ← Back to events
      </button>
      <h1 className="mt-4 font-display text-5xl">{existing ? "Edit event" : "New event"}</h1>

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div>
          <span className={labelCls}>Flyer</span>
          <label className="group relative flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-bone/25 bg-ash transition-colors hover:border-ember">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Flyer preview" className="h-full w-full object-contain" />
            ) : (
              <span className="px-6 text-center text-bone/60">
                <span className="block font-display text-2xl text-bone">Tap to add flyer</span>
                JPG, PNG, or a screenshot
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          {preview && <p className="mt-2 text-center text-sm text-bone/50">Tap the flyer to replace it</p>}
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="ev-title" className={labelCls}>Event name</label>
            <input id="ev-title" required value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="Freedom Fest" />
          </div>

          <div>
            <span className={labelCls}>Date &amp; time (Eastern)</span>
            <div className="space-y-3">
              {dates.map((d, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto] gap-3 rounded-xl border border-bone/10 p-3 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-end">
                  <div className="col-span-2 sm:col-span-1">
                    <span className="mb-1 block text-xs text-bone/50">Date</span>
                    <input type="date" required={i === 0} value={d.date} onChange={(e) => setDate(i, { date: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <span className="mb-1 block text-xs text-bone/50">Starts</span>
                    <input type="time" required={i === 0} value={d.start} onChange={(e) => setDate(i, { start: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <span className="mb-1 block text-xs text-bone/50">Ends (optional)</span>
                    <input type="time" value={d.end} onChange={(e) => setDate(i, { end: e.target.value })} className={inputCls} />
                  </div>
                  {dates.length > 1 && (
                    <button type="button" aria-label="Remove this date" onClick={() => setDates((all) => all.filter((_, j) => j !== i))} className="col-span-2 h-11 rounded-full text-sm text-bone/60 hover:text-ember-soft sm:col-span-1 sm:w-11">
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setDates((d) => [...d, { date: "", start: d.at(-1)?.start ?? "", end: d.at(-1)?.end ?? "" }])} className={`${ghostBtn} mt-3`}>
              + Add another date
            </button>
            <p className="mt-2 text-xs text-bone/40">For repeating events, like a monthly gathering, add each date.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="ev-venue" className={labelCls}>Place name</label>
              <input id="ev-venue" required value={venue} onChange={(e) => setVenue(e.target.value)} className={inputCls} placeholder="Fayetteville Cares" />
            </div>
            <div>
              <label htmlFor="ev-address" className={labelCls}>Address</label>
              <input id="ev-address" value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} placeholder="128 S King St, Fayetteville, NC" />
            </div>
          </div>

          <div>
            <label htmlFor="ev-summary" className={labelCls}>Short description</label>
            <textarea id="ev-summary" rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} className={`${inputCls} resize-y`} placeholder="What should people know? Food, music, who’s speaking…" />
          </div>

          <div>
            <label htmlFor="ev-link" className={labelCls}>Sign-up or ticket link (optional)</label>
            <input id="ev-link" type="url" value={link} onChange={(e) => setLink(e.target.value)} className={inputCls} placeholder="https://" />
          </div>

          {error && (
            <p className="rounded-xl border border-flame/50 bg-flame/10 px-4 py-3 text-sm text-bone" role="alert">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button className={primaryBtn} disabled={saving}>
              {saving ? "Publishing…" : existing ? "Save changes" : "Publish event"}
            </button>
            <button type="button" className={ghostBtn} onClick={onCancel} disabled={saving}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
