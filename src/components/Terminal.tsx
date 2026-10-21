import { useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { education, experience, features, profile, skills } from "../content";
import { pageHref } from "../router";
import { SpotDance } from "./SpotDance";

type Line = { kind: "in" | "out"; text: ReactNode };

const quickCommands = ["about", "projects", "experience", "resume", "contact", "spot dance"];

const welcome: Line[] = [
  { kind: "out", text: "hi! this is a tiny terminal. type a question, or tap a button below." },
];

const aliases: [string, string[]][] = [
  ["help", ["help", "commands", "menu", "options", "?"]],
  ["contact", ["contact", "email", "e-mail", "linkedin", "github", "instagram", "reach", "hire", "message", "talk"]],
  ["experience", ["experience", "work", "job", "jobs", "intern", "research", "lab"]],
  ["skills", ["skill", "language", "tools", "stack", "know"]],
  ["resume", ["resume", "résumé", "cv", "pdf"]],
  ["suggest", ["suggest", "suggestion", "suggestions", "recommend", "destination", "visit"]],
  ["projects", ["project", "built", "build", "made", "portfolio"]],
  ["school", ["school", "unc", "class", "major", "study", "degree", "college"]],
  ["about", ["about", "who", "whoami", "yourself", "lexi", "intro"]],
  ["hello", ["hi", "hello", "hey", "yo", "sup"]],
];

function understand(raw: string): [string, string[]] {
  const words = raw.toLowerCase().replace(/^\$\s*/, "").replace(/[^\w\s?é#-]/g, " ").split(/\s+/).map((w) => (w === "?" ? w : w.replace(/\?+$/, ""))).filter(Boolean);
  if (words.length === 0) return ["", []];

  const num = words.find((w) => /^#?\d+$/.test(w));
  if (num && (words.length === 1 || /project|open|show|number|#/.test(raw.toLowerCase()))) return ["project", [num.replace("#", "")]];

  if (words.includes("spot")) {
    const rest = words.filter((w) => w !== "spot" && w !== "make" && w !== "do" && w !== "a");
    return ["spot", rest];
  }

  if (words[0] === "clear" || words[0] === "cls") return ["clear", []];
  if (words[0] === "sudo") return ["sudo", []];
  if (words[0] === "ls") return ["ls", []];

  for (const [command, keys] of aliases) {
    if (words.some((w) => keys.some((k) => w === k || (k.length > 3 && w.startsWith(k))))) return [command, words.slice(1)];
  }
  return [words[0], words.slice(1)];
}

function Link({ href, children }: { href: string; children: ReactNode }) {
  const external = !href.startsWith("#");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {children}
    </a>
  );
}

const danceCode = `spot.stand_up()
repeat 3 times:
    spot.sway_side_to_side()
    spot.bounce()
spot.strike_a_pose()   # feet never move`;

const tricks: Record<string, string> = {
  sit: "Spot sits down. good boy.",
  dance: "Spot sways and bobs with his feet planted.",
  pushup: "Spot does 3 full pushups.",
  pushups: "Spot does 3 full pushups.",
  nod: "Spot nods yes.",
  spin: "Spot checks for obstacles, then turns once in place.",
  stand: "Spot stands up.",
};

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(welcome);
  const [input, setInput] = useState("");
  const history = useRef<string[]>([]);
  const historyIndex = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, (args: string[]) => ReactNode[]> = {
    help: () => [
      "here’s what i understand:",
      "  about        who i am",
      "  projects     what i’ve built",
      "  experience   where i’ve worked",
      "  resume       view or download my résumé",
      "  skills       languages and tools",
      "  school       where i study",
      "  contact      how to reach me",
      "  spot dance   (try it)",
      "  clear        clean up the screen",
      "or just ask in plain words, like “what’s your email?”",
    ],
    hello: () => ["hi! nice to meet you. type help to see what you can ask, or tap a button."],
    about: () => [
      profile.intro,
      <>
        more on <Link href={pageHref("about")}>the about page →</Link>
      </>,
    ],
    school: () => [`${education.school}`, `${education.degree}, ${education.dates}`],
    projects: () => [
      ...features.map((f, i) => `  ${String(i + 1).padStart(2)}  ${f.title} (${f.year})`),
      "type a number, like 1, to hear more about one.",
    ],
    project: ([n]) => {
      const f = features[Number(n) - 1];
      if (!f) return [`there are ${features.length} projects. try a number from 1 to ${features.length}.`];
      return [
        f.title,
        f.dek,
        `${f.year} · ${f.stack.join(", ")}`,
        <>
          full story on <Link href={pageHref("projects")}>the projects page →</Link>
        </>,
      ];
    },
    experience: () => experience.flatMap((job) => [`${job.role}`, `  ${job.org}, ${job.dates}`]),
    skills: () => Object.entries(skills).map(([group, items]) => `${group}: ${items.join(", ")}`),
    resume: () =>
      profile.resume
        ? [
            <>
              <Link href={profile.resume}>view my résumé ↗</Link>
              {"   "}
              <a href={profile.resume} download="Lexi Tinajero Resume.pdf">
                download pdf ↓
              </a>
            </>,
          ]
        : ["my experience is all on the about page. for a pdf, just email me.", ...commands.contact([])],
    contact: () => [
      <>
        email      <Link href={`mailto:${profile.email}`}>{profile.email}</Link>
      </>,
      <>
        linkedin   <Link href={profile.linkedin}>alexatinajero</Link>
      </>,
      <>
        github     <Link href={profile.github}>lexitinajero</Link>
      </>,
      <>
        instagram  <Link href={profile.instagram}>@lexitinajero</Link>
      </>,
    ],
    spot: (args) => {
      const trick = args.find((a) => tricks[a]);
      if (trick === "dance") return [<pre key="code" className="spot-code">{danceCode}</pre>, <SpotDance key={Date.now()} />];
      if (trick) return [tricks[trick]];
      return ["Spot knows: sit, dance, pushup, nod, spin, stand.", "try “spot dance”."];
    },
    suggest: () => [
      "next destination: undecided. accepting suggestions.",
      <>
        send yours to <Link href={`mailto:${profile.email}?subject=you should visit...`}>{profile.email}</Link>
      </>,
    ],
    ls: () => ["about.md    projects/    experience.log    resume.pdf    contact.txt"],
    sudo: () => ["nice try."],
  };

  function run(raw: string) {
    raw = raw.trim();
    if (!raw) return;
    history.current.push(raw);
    historyIndex.current = history.current.length;

    const [name, args] = understand(raw);
    if (name === "clear") {
      setLines([]);
      return;
    }
    const result = commands[name]?.(args) ?? [
      "hmm, i don’t know that one yet.",
      "try a button below, or type help to see everything.",
    ];
    setLines((old) => [...old, { kind: "in", text: raw }, ...result.map((text) => ({ kind: "out" as const, text }))]);

    requestAnimationFrame(() => {
      const screen = screenRef.current;
      if (screen) screen.scrollTop = screen.scrollHeight;
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(input);
    setInput("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const h = history.current;
    historyIndex.current = Math.max(0, Math.min(h.length, historyIndex.current + (e.key === "ArrowUp" ? -1 : 1)));
    setInput(h[historyIndex.current] ?? "");
  }

  return (
    <div className="terminal">
      <div className="terminal-bar" aria-hidden="true">
        <span>lexi@unc: ~</span>
        <span>ask me anything</span>
      </div>

      <div
        className="terminal-screen"
        ref={screenRef}
        aria-live="polite"
        onClick={(e) => (e.target as HTMLElement).tagName !== "A" && inputRef.current?.focus({ preventScroll: true })}
      >
        {lines.map((line, i) =>
          line.kind === "in" ? (
            <p key={i}>
              <span className="prompt">$</span> {line.text}
            </p>
          ) : (
            <div key={i} className="out">
              {line.text}
            </div>
          ),
        )}
        <form onSubmit={onSubmit} className="terminal-input">
          <label htmlFor="terminal-input" className="prompt">
            $<span className="sr-only">Ask a question or type a command</span>
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={lines.length <= 1 ? "try: who are you?" : ""}
            enterKeyHint="send"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>
      <div className="terminal-chips" aria-label="Quick commands">
        {quickCommands.map((c) => (
          <button key={c} type="button" onClick={() => run(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
