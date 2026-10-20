-- Fire4Prodigals: run this once in Supabase → SQL Editor → New query → Run.
-- It creates the events table, the flyer image storage, and the rules for who can edit.

-- 1. People allowed to post flyers. Add a row per volunteer email.
create table if not exists public.editors (
  email text primary key
);

-- 2. Events / flyers
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  flyer_url text not null,
  flyer_width int not null default 1080,
  flyer_height int not null default 1350,
  sessions jsonb not null default '[]'::jsonb, -- [{ "start": ISO time, "end": ISO time or null }]
  venue text not null default '',
  address text not null default '',
  summary text not null default '',
  link text,
  created_at timestamptz not null default now()
);

-- 3. Small table the daily keep-awake check touches
create table if not exists public.heartbeat (
  id int primary key default 1,
  last_seen timestamptz not null default now()
);
insert into public.heartbeat (id) values (1) on conflict do nothing;

-- Security rules: anyone can read events; only listed editors can change them.
alter table public.events enable row level security;
alter table public.editors enable row level security;
alter table public.heartbeat enable row level security;

create or replace function public.is_editor() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.editors where lower(email) = lower(auth.jwt() ->> 'email'));
$$;

drop policy if exists "events are public" on public.events;
create policy "events are public" on public.events for select using (true);

drop policy if exists "editors manage events" on public.events;
create policy "editors manage events" on public.events for all
  using (public.is_editor()) with check (public.is_editor());

drop policy if exists "editors can see editor list" on public.editors;
create policy "editors can see editor list" on public.editors for select using (public.is_editor());

drop policy if exists "heartbeat readable" on public.heartbeat;
create policy "heartbeat readable" on public.heartbeat for select using (true);

-- 4. Public storage bucket for flyer images
insert into storage.buckets (id, name, public)
values ('flyers', 'flyers', true)
on conflict (id) do nothing;

drop policy if exists "flyers are public" on storage.objects;
create policy "flyers are public" on storage.objects for select using (bucket_id = 'flyers');

drop policy if exists "editors upload flyers" on storage.objects;
create policy "editors upload flyers" on storage.objects for insert
  with check (bucket_id = 'flyers' and public.is_editor());

drop policy if exists "editors delete flyers" on storage.objects;
create policy "editors delete flyers" on storage.objects for delete
  using (bucket_id = 'flyers' and public.is_editor());
