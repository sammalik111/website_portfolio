import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultResume, parseResume, type Resume } from "@/data/resume";

const ResumeContext = createContext<Resume>(defaultResume);

/**
 * Renders the bundled content immediately, then swaps in the live JSON from
 * VITE_CONTENT_URL (the S3 object). Any failure keeps the bundled content.
 */
export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resume, setResume] = useState<Resume>(defaultResume);

  useEffect(() => {
    const url = import.meta.env.VITE_CONTENT_URL;
    if (!url) return;

    const controller = new AbortController();
    // "no-cache" = revalidate with the server every load; S3 answers 304 if unchanged,
    // so edits show up on the next refresh without any cache-busting.
    fetch(url, { cache: "no-cache", signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const parsed = parseResume(json);
        if (parsed) setResume(parsed);
        else console.warn("resume: fetched content is invalid; using bundled content");
      })
      .catch((err) => {
        if (err?.name !== "AbortError") console.warn("resume: using bundled content —", err);
      });

    return () => controller.abort();
  }, []);

  return <ResumeContext value={resume}>{children}</ResumeContext>;
}

export const useResume = () => useContext(ResumeContext);
