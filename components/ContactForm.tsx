"use client";

import { useState } from "react";

// Submissions go to Web3Forms (free). Set NEXT_PUBLIC_WEB3FORMS_KEY to the ministry's access key.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const interests = ["Volunteering", "Inviting you to an event", "Prayer request", "Something else"];

const field =
  "peer w-full border-0 border-b border-bone/20 bg-transparent px-0 pb-3 pt-6 text-lg text-bone outline-none transition-colors duration-500 placeholder:text-transparent focus:border-ember";
const label =
  "pointer-events-none absolute left-0 top-6 origin-left text-bone/50 transition-all duration-500 ease-out-expo peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-ember peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-75";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [picked, setPicked] = useState<string[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, interests: picked.join(", "), access_key: ACCESS_KEY, subject: "New message from fire4prodigals.com" }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-bone/10 bg-ash p-10">
        <p className="eyebrow">Message sent</p>
        <p className="mt-4 font-display text-4xl">Thank you. We’ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-bone/10 bg-ash p-6 md:p-10">
      <fieldset>
        <legend className="eyebrow">I’m interested in</legend>
        <div className="mt-5 flex flex-wrap gap-2">
          {interests.map((i) => {
            const on = picked.includes(i);
            return (
              <button
                type="button"
                key={i}
                aria-pressed={on}
                onClick={() => setPicked((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                className={`min-h-11 rounded-full border px-5 text-sm font-medium transition-colors duration-500 ${on ? "border-ember bg-ember text-ink" : "border-bone/20 text-bone/75 hover:border-bone/60"}`}
              >
                {i}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-2 md:grid-cols-2 md:gap-8">
        <div className="relative">
          <input id="name" name="name" required placeholder="Name" className={field} autoComplete="name" />
          <label htmlFor="name" className={label}>Your name</label>
        </div>
        <div className="relative">
          <input id="email" name="email" type="email" required placeholder="Email" className={field} autoComplete="email" />
          <label htmlFor="email" className={label}>Email</label>
        </div>
      </div>
      <div className="relative mt-2">
        <input id="phone" name="phone" type="tel" placeholder="Phone" className={field} autoComplete="tel" />
        <label htmlFor="phone" className={label}>Phone (optional)</label>
      </div>
      <div className="relative mt-2">
        <textarea id="message" name="message" required rows={4} placeholder="Message" className={`${field} resize-none`} />
        <label htmlFor="message" className={label}>How can we help?</label>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ember font-semibold text-ink transition-colors duration-500 hover:bg-ember-soft disabled:opacity-60 md:w-auto md:px-10"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="mt-4 text-sm text-ember-soft" role="alert">
          Something went wrong. Please call or text us instead.
        </p>
      )}
    </form>
  );
}
