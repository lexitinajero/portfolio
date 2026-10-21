import { useEffect, useState } from "react";

export const pages = ["home", "about", "projects", "moments"] as const;
export type Page = (typeof pages)[number];

export function pageHref(page: Page) {
  return page === "home" ? "#/" : `#/${page}`;
}

function pageFromHash(hash: string): Page | null {
  if (!hash.startsWith("#/")) return null;
  const name = hash.slice(2);
  return (pages as readonly string[]).includes(name) ? (name as Page) : "home";
}

export function usePage() {
  const [page, setPage] = useState<Page>(() => pageFromHash(window.location.hash) ?? "home");

  useEffect(() => {
    const onChange = () => {
      const next = pageFromHash(window.location.hash);
      if (next === null) return;
      setPage(next);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return page;
}
