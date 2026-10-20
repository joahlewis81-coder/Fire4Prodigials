// Runs once a day so the free Supabase project never pauses from inactivity.
export default async () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return new Response("Supabase not configured", { status: 200 });
  const res = await fetch(`${url}/rest/v1/heartbeat?select=id`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  console.log("Supabase keep-alive:", res.status);
  return new Response(`ok ${res.status}`);
};

export const config = { schedule: "@daily" };
