// Event flyers. Each event has one or more sessions (recurring events list every date).
// Times include the Eastern time offset so they sort and display correctly.
export type EventSession = { start: string; end?: string };

export type FlyerEvent = {
  slug: string;
  title: string;
  flyer: string;
  sessions: EventSession[];
  venue: string;
  address: string;
  summary: string;
  link?: string;
};

export const events: FlyerEvent[] = [
  {
    slug: "freedom-fest-2026",
    title: "Freedom Fest",
    flyer: "/images/flyers/freedom-fest-2026.webp",
    sessions: [{ start: "2026-11-07T13:00:00-05:00" }],
    venue: "Downtown on the Plaza",
    address: "Lumberton, NC",
    summary:
      "A day of faith, music, and freedom. Brandon Hamilton brings the Word, with worship from The United Worship Band, Song Byrd Ministries, food trucks, and local vendors.",
  },
  {
    slug: "fayetteville-cares",
    title: "Fayetteville Cares",
    flyer: "/images/flyers/fayetteville-cares.webp",
    sessions: [
      { start: "2026-09-15T10:00:00-04:00", end: "2026-09-15T11:30:00-04:00" },
      { start: "2026-10-20T10:00:00-04:00", end: "2026-10-20T11:30:00-04:00" },
      { start: "2026-11-17T10:00:00-05:00", end: "2026-11-17T11:30:00-05:00" },
    ],
    venue: "Fayetteville Cares",
    address: "128 South King Street, Fayetteville, NC",
    summary:
      "Hope, encouragement, and recovery support on the third Tuesday of each month. Light snacks, a hope-filled message, and resources for those who want them. Everyone is welcome. Come as you are.",
  },
  {
    slug: "cape-fear-outreach-2026",
    title: "Community Outreach Day",
    flyer: "/images/flyers/cape-fear-outreach-2026.webp",
    sessions: [{ start: "2026-10-15T10:00:00-04:00", end: "2026-10-15T14:00:00-04:00" }],
    venue: "Kingdom Impact Global Ministries",
    address: "2503 Murchison Road, Fayetteville, NC 28301",
    summary:
      "Hosted by the Cape Fear Valley Community Paramedic Program, with free food, resources, and health information. Fire4Prodigals was there for prayer, encouragement, and resource connections.",
  },
  {
    slug: "restored-table-revival-2026",
    title: "The Restored Table Spring Revival",
    flyer: "/images/flyers/restored-table-revival-2026.webp",
    sessions: [
      { start: "2026-04-17T19:00:00-04:00" },
      { start: "2026-04-18T18:00:00-04:00" },
      { start: "2026-04-19T10:00:00-04:00" },
    ],
    venue: "The Restored Table",
    address: "12560 NC-210, Benson, NC 27504",
    summary:
      "Three nights of worship and preaching with Drew Anderson and Pastor Josh Harris.",
  },
  {
    slug: "celebrate-recovery-2026",
    title: "Celebrate Recovery: Brandon's Testimony",
    flyer: "/images/flyers/celebrate-recovery-2026.webp",
    sessions: [{ start: "2026-04-10T19:00:00-04:00" }],
    venue: "MidPoint Church",
    address: "",
    summary:
      "Brandon Hamilton shared his testimony at Celebrate Recovery. Snacks at 6:30, childcare provided.",
  },
  {
    slug: "overdose-awareness-day-2026",
    title: "Overdose Awareness Day",
    flyer: "/images/flyers/overdose-awareness-day-2026.webp",
    sessions: [{ start: "2026-08-29T13:00:00-04:00", end: "2026-08-29T17:00:00-04:00" }],
    venue: "Changing Paths NC II",
    address: "205 Martha Ln, Clinton, NC 28328",
    summary:
      "Remember. Support. Prevent. Brandon & Melody Hamilton spoke at this free community day with music, resources, bouncy houses, ice cream, and a butterfly release for those lost to overdose.",
  },
  {
    slug: "lumberton-plaza-outreach-2026",
    title: "Community Outreach at Lumberton Plaza",
    flyer: "/images/flyers/lumberton-plaza-outreach-2026.webp",
    sessions: [{ start: "2026-05-30T11:00:00-04:00", end: "2026-05-30T15:00:00-04:00" }],
    venue: "Lumberton Plaza",
    address: "Lumberton, NC",
    summary:
      "Free food. Real hope. No judgment. Free hotdogs, live music, and local testimonies, with Drew Anderson bringing the Word. Alongside 4PointsNorth, The United Worship Band, Cause We Care, and Rock Bottom Ministries.",
  },
  {
    slug: "pull-up-and-eat-2026",
    title: "Pull Up and Eat",
    flyer: "/images/flyers/pull-up-and-eat-2026.webp",
    sessions: [{ start: "2026-04-04T11:00:00-04:00", end: "2026-04-04T14:00:00-04:00" }],
    venue: "Rocky Mount",
    address: "341 McDonald St, Rocky Mount, NC",
    summary:
      "Feeding the unhoused community in the park with free food, clothes, Bibles, and prayer, alongside Operation Recovery and Rock Bottom Ministries. If you're struggling and need a meal, it's for you.",
  },
  {
    slug: "serving-the-homeless-2026",
    title: "Serving the Homeless",
    flyer: "/images/flyers/serving-the-homeless-2026.webp",
    sessions: [{ start: "2026-02-21T12:00:00-05:00", end: "2026-02-21T15:00:00-05:00" }],
    venue: "Fayetteville",
    address: "128 S King St, Fayetteville, NC 28301",
    summary:
      "Being the hands and feet of Jesus with food, clothing, and prayer, alongside The Restored Table and Rock Bottom Ministries.",
  },
  {
    slug: "revival-moments-2025",
    title: "Revival Moments & Testimonial Service",
    flyer: "/images/flyers/revival-moments-2025.webp",
    sessions: [{ start: "2025-10-25T11:00:00-04:00" }],
    venue: "Sunshine's Faith Over Fear Ministries",
    address: "605 Depot Street, Rockwell, NC 28138",
    summary:
      "Healing, prayer, worship, and deliverance with Sunshine & SJ, guest speaker Kristy, and Evangelist Brandon Hamilton & Melody. Free food, drinks, and care packages.",
  },
  {
    slug: "resurrection-bash-2026",
    title: "Resurrection Bash",
    flyer: "/images/flyers/resurrection-bash-2026.webp",
    sessions: [{ start: "2026-03-28T13:00:00-04:00" }],
    venue: "Christ Fellowship Church of Toccoa",
    address: "3273 GA-17, Toccoa, GA 30577",
    summary:
      "Egg hunts, crafts, a free meal and food box giveaway, the Resurrection story, and music by #GODGANG & Friends.",
  },
];
