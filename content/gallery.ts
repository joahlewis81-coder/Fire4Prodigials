import sizes from "./images.json";

type Photo = { src: string; alt: string; width: number; height: number };

const raw: [string, string][] = [
  ["prayer-circle", "Men kneeling together in prayer, hands on each other's shoulders"],
  ["night-baptism", "A baptism at night in a water trough under string lights"],
  ["worship-hands-raised", "Hands raised in worship under a tent"],
  ["prayer-laying-hands", "Volunteers praying over a woman at an event"],
  ["worship-tent-band", "A worship band leading under a lit tent"],
  ["prayer-under-tent", "Women praying together at an evening gathering"],
  ["lumberton-main-street", "Fire4Prodigals outreach on Main Street in Lumberton"],
  ["street-outreach", "Outreach team members together in a parking lot"],
  ["celebrate-recovery-testimony", "Sharing a testimony at Celebrate Recovery"],
  ["speaking-classroom", "Speaking to a group in a classroom"],
  ["outreach-team", "Three team members in Fire4Prodigals shirts"],
  ["outreach-family", "A family at an outreach event"],
  ["outreach-family-2", "A family wearing Fire4Prodigals shirts"],
  ["resource-table", "The Fire4Prodigals table with Bibles and resources"],
  ["outreach-table", "The Fire4Prodigals table set up outdoors"],
  ["tablecloth-banner", "The Fire4Prodigals tablecloth with scripture"],
  ["event-guests", "Guests at a Fire4Prodigals event"],
  ["event-guests-2", "Team members together at an event"],
];

export const photos: Photo[] = raw.map(([name, alt]) => {
  const src = `/images/photos/${name}.webp`;
  const s = (sizes as Record<string, { width: number; height: number }>)[src];
  return { src, alt, ...s };
});

export const photo = (name: string) => photos.find((p) => p.src.endsWith(`/${name}.webp`))!;
