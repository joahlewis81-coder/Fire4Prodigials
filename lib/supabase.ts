import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

/** Shared Supabase client. Returns null until the keys are set in Netlify. */
export function supabase() {
  if (!supabaseConfigured) return null;
  client ??= createClient(url!, anonKey!, {
    auth: { persistSession: typeof window !== "undefined", detectSessionInUrl: true, flowType: "implicit" },
  });
  return client;
}

export const FLYER_BUCKET = "flyers";

export type EventRow = {
  id: string;
  slug: string;
  title: string;
  flyer_url: string;
  flyer_width: number;
  flyer_height: number;
  sessions: { start: string; end?: string | null }[];
  venue: string;
  address: string;
  summary: string;
  link: string | null;
};
