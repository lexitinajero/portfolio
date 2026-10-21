import { useCallback, useEffect, useState } from "react";
import { photos, profile } from "./content";
import { ContentsMenu } from "./components/ContentsMenu";
import { Intro } from "./components/Intro";
import { StatusBar } from "./components/StatusBar";
import { AboutPage } from "./pages/AboutPage";
import { HomePage } from "./pages/HomePage";
import { MomentsPage } from "./pages/MomentsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { pageHref, usePage, type Page } from "./router";

const nav: { page: Page; label: string; title: string }[] = [
  { page: "home", label: "home", title: "home" },
  { page: "about", label: "about", title: "about me" },
  { page: "projects", label: "projects", title: "projects" },
  ...(photos.length > 0 ? [{ page: "moments" as const, label: "moments", title: "moments" }] : []),
];

function App() {
  const page = usePage();
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const [introDone, setIntroDone] = useState(false);
  const markIntroDone = useCallback(() => setIntroDone(true), []);

  return (
    <>
      <Intro onDone={markIntroDone} />

      <header className="topbar">
        <StatusBar />
        <div className="topbar-row">
          <a href={pageHref("home")} className="topbar-logo">
            lexi tinajero
          </a>
          <nav className="topbar-links" aria-label="Pages">
            {nav.map((n) => (
              <a key={n.page} href={pageHref(n.page)} aria-current={n.page === page ? "page" : undefined}>
                ~/{n.label}
              </a>
            ))}
          </nav>
          <button className="topbar-menu" onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen}>
            {menuOpen ? "close" : "menu"}
          </button>
        </div>
        <div className="read-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </header>
      <ContentsMenu
        items={nav.map((n, i) => ({ href: pageHref(n.page), title: n.title, page: String(i + 1).padStart(2, "0"), current: n.page === page }))}
        open={menuOpen}
        onClose={closeMenu}
      />

      <main key={page} className="page">
        {page === "home" && <HomePage ready={introDone} />}
        {page === "about" && <AboutPage />}
        {page === "projects" && <ProjectsPage />}
        {page === "moments" && <MomentsPage />}
      </main>

      <footer className="footer">
        <p className="footer-links">
          <a href={`mailto:${profile.email}`}>email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            github
          </a>
          <a href={profile.instagram} target="_blank" rel="noreferrer">
            instagram
          </a>
        </p>
        <p>© {new Date().getFullYear()} lexi tinajero</p>
        <button className="to-top" onClick={() => window.scrollTo({ top: 0 })}>
          back to the top ↑
        </button>
      </footer>

    </>
  );
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return progress;
}

export default App;
