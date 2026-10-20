"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase, supabaseConfigured, FLYER_BUCKET, type EventRow } from "@/lib/supabase";
import { rowToEvent } from "@/lib/data";
import { formatSession, nextSession, splitEvents } from "@/lib/events";
import { EventForm } from "./EventForm";
import { ghostBtn, dangerBtn, inputCls, labelCls, primaryBtn } from "./ui";

type View = { mode: "list" } | { mode: "new" } | { mode: "edit"; row: EventRow };

export function AdminApp() {
  const db = supabase();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isEditor, setIsEditor] = useState<boolean | null>(null);

  useEffect(() => {
    if (!db) return;
    db.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = db.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [db]);

  useEffect(() => {
    if (!db || !session) return setIsEditor(null);
    db.rpc("is_editor").then(({ data }) => setIsEditor(Boolean(data)));
  }, [db, session]);

  if (!supabaseConfigured || !db) {
    return (
      <Panel title="Flyer editor isn’t connected yet">
        <p className="text-bone/70">
          Add <code className="text-ember-soft">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-ember-soft">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in Netlify → Site configuration → Environment
          variables, then redeploy.
        </p>
      </Panel>
    );
  }
  if (!ready) return <p className="text-bone/50">Loading…</p>;
  if (!session) return <Login />;
  if (isEditor === null) return <p className="text-bone/50">Checking access…</p>;
  if (!isEditor) {
    return (
      <Panel title="You’re signed in, but not on the editor list">
        <p className="text-bone/70">
          Signed in as {session.user.email}. Ask Brandon or Melody to add this email to the editors list in Supabase.
        </p>
        <button className={`${ghostBtn} mt-6`} onClick={() => db.auth.signOut()}>
          Sign out
        </button>
      </Panel>
    );
  }
  return <Dashboard email={session.user.email ?? ""} />;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-bone/10 bg-ash p-8 md:p-10">
      <p className="eyebrow">Flyer editor</p>
      <h1 className="mt-3 font-display text-4xl leading-tight">{title}</h1>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const { error } = await supabase()!.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${location.origin}/admin` },
    });
    if (error) {
      setError(error.message);
      setState("error");
    } else setState("sent");
  }

  return (
    <Panel title={state === "sent" ? "Check your email" : "Sign in to post flyers"}>
      {state === "sent" ? (
        <p className="text-bone/70">
          We sent a sign-in link to <strong className="text-bone">{email}</strong>. Open it on this device and you’ll land back
          here, signed in.
        </p>
      ) : (
        <form onSubmit={send}>
          <label htmlFor="login-email" className={labelCls}>
            Your email
          </label>
          <input
            id="login-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="you@example.com"
          />
          <button className={`${primaryBtn} mt-6 w-full`} disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Email me a sign-in link"}
          </button>
          {state === "error" && (
            <p className="mt-4 text-sm text-ember-soft" role="alert">
              {error}
            </p>
          )}
        </form>
      )}
    </Panel>
  );
}

function Dashboard({ email }: { email: string }) {
  const db = supabase()!;
  const [rows, setRows] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>({ mode: "list" });
  const [notice, setNotice] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await db.from("events").select("*");
    if (error) setNotice(`Couldn’t load events: ${error.message}`);
    setRows((data as EventRow[]) ?? []);
    setLoading(false);
  }, [db]);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(row: EventRow) {
    if (!confirm(`Delete “${row.title}”? This removes it from the website.`)) return;
    setBusyId(row.id);
    const { error } = await db.from("events").delete().eq("id", row.id);
    if (!error) {
      const marker = `/storage/v1/object/public/${FLYER_BUCKET}/`;
      const i = row.flyer_url.indexOf(marker);
      if (i >= 0) await db.storage.from(FLYER_BUCKET).remove([decodeURIComponent(row.flyer_url.slice(i + marker.length))]);
      setNotice(`Deleted “${row.title}”.`);
      await load();
    } else setNotice(`Couldn’t delete: ${error.message}`);
    setBusyId(null);
  }

  if (view.mode !== "list") {
    return (
      <EventForm
        db={db}
        existing={view.mode === "edit" ? view.row : undefined}
        takenSlugs={rows.map((r) => r.slug)}
        onCancel={() => setView({ mode: "list" })}
        onSaved={async (title) => {
          setNotice(`Published “${title}”. It will appear on the website within a minute.`);
          setView({ mode: "list" });
          await load();
        }}
      />
    );
  }

  const events = rows.map((r) => ({ row: r, event: rowToEvent(r) })).filter((x) => x.event.sessions.length);
  const { upcoming, past } = splitEvents(events.map((x) => x.event));
  const byEvent = new Map(events.map((x) => [x.event, x.row]));

  return (
    <div>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Flyer editor</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Events</h1>
          <p className="mt-2 text-sm text-bone/50">
            Signed in as {email} ·{" "}
            <button className="underline underline-offset-4 hover:text-bone" onClick={() => db.auth.signOut()}>
              Sign out
            </button>
          </p>
        </div>
        <button className={primaryBtn} onClick={() => setView({ mode: "new" })}>
          + Add event
        </button>
      </div>

      {notice && (
        <p className="mt-8 rounded-xl border border-ember/30 bg-ember/10 px-5 py-4 text-sm text-bone" role="status">
          {notice}
        </p>
      )}

      {loading ? (
        <p className="mt-12 text-bone/50">Loading events…</p>
      ) : (
        [
          { label: "Upcoming", list: upcoming },
          { label: "Past", list: past },
        ].map((group) => (
          <div key={group.label} className="mt-14">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-smoke">
              {group.label} ({group.list.length})
            </h2>
            {group.list.length === 0 ? (
              <p className="mt-4 text-bone/50">None yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-bone/10 border-y border-bone/10">
                {group.list.map((e) => {
                  const row = byEvent.get(e)!;
                  const f = formatSession(nextSession(e));
                  return (
                    <li key={row.id} className="flex items-center gap-4 py-4 md:gap-6">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-ash">
                        <Image src={e.flyer} alt="" fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-2xl">{e.title}</p>
                        <p className="truncate text-sm text-bone/55">
                          {f.day}
                          {e.sessions.length > 1 && ` · ${e.sessions.length} dates`}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <button className={ghostBtn} onClick={() => setView({ mode: "edit", row })}>
                          Edit
                        </button>
                        <button className={dangerBtn} disabled={busyId === row.id} onClick={() => remove(row)}>
                          {busyId === row.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
}
