import { useCallback, useEffect, useState } from "react";
import { TypedLine } from "./TypedLine";

const STEPS: [string, string][] = [
  ["reading about.md", "ok"],
  ["building projects/", "ok"],
  ["waking up spot", "ok"],
  ["checking for typos", "probably fine"],
];

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
  const [typed, setTyped] = useState(false);
  const [shown, setShown] = useState(0);
  const doneTyping = useCallback(() => setTyped(true), []);

  useEffect(() => {
    if (phase !== "loading" || !typed) return;
    const t =
      shown <= STEPS.length
        ? setTimeout(() => setShown((s) => s + 1), shown === 0 ? 250 : 220)
        : setTimeout(() => setPhase("leaving"), 500);
    return () => clearTimeout(t);
  }, [phase, typed, shown]);

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
      <p>
        <span className="intro-prompt">lexi@unc ~ %</span> <TypedLine text="open portfolio" speed={40} delay={250} onDone={doneTyping} />
        {!typed && <span className="intro-cursor" />}
      </p>
      {STEPS.slice(0, shown).map(([label, status]) => (
        <p key={label}>
          <span className="intro-step">{(label + " ").padEnd(24, ".")}</span> {status}
        </p>
      ))}
      {shown > STEPS.length && (
        <p>
          <span className="intro-prompt">lexi@unc ~ %</span> <span className="intro-cursor" />
        </p>
      )}
    </div>
  );
}
