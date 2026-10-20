// Writes supabase/seed.sql with the flyers already in the site, so they show up once Supabase is connected.
// Usage: node scripts/make-seed.mjs   (run after editing content/events.ts)
import fs from "node:fs";

const src = fs.readFileSync("content/events.ts", "utf8");
const body = src.slice(src.indexOf("= [") + 2, src.lastIndexOf("];") + 1);
const events = new Function(`return ${body}`)();
const sizes = JSON.parse(fs.readFileSync("content/images.json", "utf8"));

const q = (v) => (v == null ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const SITE = ""; // site-relative, so it works on any web address

const rows = events.map((e) => {
  const s = sizes[e.flyer] ?? { width: 1080, height: 1350 };
  return `(${q(e.slug)}, ${q(e.title)}, ${q(SITE + e.flyer)}, ${s.width}, ${s.height}, ${q(JSON.stringify(e.sessions))}::jsonb, ${q(e.venue)}, ${q(e.address)}, ${q(e.summary)}, ${q(e.link ?? null)})`;
});

const sql = `-- Existing flyers. Run once in Supabase → SQL Editor after schema.sql.
-- These flyer images stay hosted on the website itself (paths start with /images).
insert into public.events (slug, title, flyer_url, flyer_width, flyer_height, sessions, venue, address, summary, link) values
${rows.join(",\n")}
on conflict (slug) do nothing;
`;
fs.writeFileSync("supabase/seed.sql", sql);
console.log(`supabase/seed.sql written with ${rows.length} events`);
