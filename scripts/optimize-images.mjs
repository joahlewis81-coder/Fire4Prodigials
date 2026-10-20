// Resizes source photos into web-ready WebP files and writes their sizes to content/images.json.
// Usage: npm run images  (reads from ../fire4prodigals-assets/raw)
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("../fire4prodigals-assets/raw");
const map = {
  flyers: {
    "IMG_0444.jpeg": "freedom-fest-2026",
    "Fayetteville cares Image Sep 2, 2026, 02_09_01 PM.png": "fayetteville-cares",
    "8433926990303087892.jpeg": "cape-fear-outreach-2026",
    "1_20260209_213836_0000.png": "celebrate-recovery-2026",
    "IMG_8705.png": "restored-table-revival-2026",
    "IMG_8763.jpeg": "resurrection-bash-2026",
    "new-revival-moments.jpg": "revival-moments-2025",
    "new-overdose-awareness.webp": "overdose-awareness-day-2026",
    "new-lumberton-outreach.webp": "lumberton-plaza-outreach-2026",
    "new-serving-homeless.webp": "serving-the-homeless-2026",
    "new-pull-up-and-eat.webp": "pull-up-and-eat-2026",
  },
  photos: {
    "DSC_9449.jpeg": "prayer-circle",
    "DSC_9457.jpeg": "prayer-laying-hands",
    "DSC_9540.jpeg": "worship-hands-raised",
    "IMG_9341.jpeg": "prayer-under-tent",
    "IMG_9338.jpeg": "night-baptism",
    "1000017460.jpeg": "worship-tent-band",
    "20260821_102901.jpeg": "speaking-classroom",
    "203.jpeg": "celebrate-recovery-testimony",
    "68fa3ffcb42e9ea1c216292dc8fd3965.jpeg": "lumberton-main-street",
    "IMG_9402.jpeg": "street-outreach",
    "20260829_131016.jpeg": "outreach-family",
    "20260829_131035.jpeg": "outreach-team",
    "20260829_131307.jpeg": "outreach-family-2",
    "20260829_131413.jpeg": "resource-table",
    "20260829_131415.jpeg": "outreach-table",
    "20260425_095345.jpeg": "tablecloth-banner",
    "20261011_120641.jpeg": "event-guests",
    "20261011_120813.jpeg": "event-guests-2",
  },
};

const out = {};
for (const [kind, files] of Object.entries(map)) {
  for (const [src, name] of Object.entries(files)) {
    const max = kind === "flyers" ? 1400 : 1800;
    const dest = `public/images/${kind}/${name}.webp`;
    const info = await sharp(path.join(SRC, src))
      .rotate()
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dest);
    out[`/images/${kind}/${name}.webp`] = { width: info.width, height: info.height };
  }
}
await sharp(path.join(SRC, "logo.png")).png().toFile("public/brand/logo.png");
fs.mkdirSync("content", { recursive: true });
fs.writeFileSync("content/images.json", JSON.stringify(out, null, 2));
console.log(Object.keys(out).length, "images written");
