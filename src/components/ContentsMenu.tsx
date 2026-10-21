import { useEffect } from "react";

export type MenuItem = { href: string; title: string; page: string; current: boolean };

export function ContentsMenu({ items, open, onClose }: { items: MenuItem[]; open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <nav className={`contents ${open ? "open" : ""}`} aria-label="Pages" inert={!open}>
      <p className="contents-label">pages</p>
      <ol>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} onClick={onClose} aria-current={item.current ? "page" : undefined}>
              <span className="contents-title">{item.title}</span>
              <span className="contents-dots" aria-hidden="true" />
              <span className="contents-page">p.{item.page}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
