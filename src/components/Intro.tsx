import { useEffect, useState } from "react";

const DURATION = 2200;

function rememberSeen() {
  try {
    sessionStorage.setItem("intro-seen", "1");
    return true;
  } catch {
    return false;
  }
}

function alreadySeen() {
  try {
    return sessionStorage.getItem("intro-seen") === "1";
  } catch {
    return false;
  }
}

export function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">(() =>
    alreadySeen() || matchMedia("(prefers-reduced-motion: reduce)").matches ? "gone" : "loading",
  );
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (phase !== "loading") return;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / DURATION);
      setPercent(Math.round((1 - (1 - t) ** 3) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setPhase("leaving"), 250);
    });
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  useEffect(() => {
    if (phase === "gone") onDone();
    if (phase !== "leaving") return;
    onDone();
    rememberSeen();
    const t = setTimeout(() => setPhase("gone"), 600);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  if (phase === "gone") return null;

  return (
    <div className={`intro ${phase}`} onClick={() => setPhase("leaving")} aria-hidden="true">
      <p className="intro-command">lexi@unc ~ % open portfolio</p>
      <p className="intro-title">
        loading
        <span className="intro-dots" />
      </p>
      <div className="intro-progress">
        <div className="intro-bar">
          <span style={{ width: `${percent}%` }} />
        </div>
        <span className="intro-percent">{percent}%</span>
      </div>
    </div>
  );
}
