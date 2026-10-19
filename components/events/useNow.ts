"use client";

import { useEffect, useState } from "react";

/** Current time, refreshed on the visitor's device so upcoming/past is always correct. */
export function useNow(initial: number) {
  const [now, setNow] = useState(initial);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}
