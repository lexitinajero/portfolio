import { useEffect, useState } from "react";

export function TypedLine({ text, speed = 70, delay = 300, onDone }: { text: string; speed?: number; delay?: number; onDone?: () => void }) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [count, setCount] = useState(reduced ? text.length : 0);

  useEffect(() => {
    if (count >= text.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? delay : speed);
    return () => clearTimeout(t);
  }, [count, text, speed, delay, onDone]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, count)}</span>
    </>
  );
}
