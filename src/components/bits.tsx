import { profile } from "../content";

export function SectionHead({ num, title, intro, as: Tag = "h2" }: { num?: string; title: string; intro?: string; as?: "h1" | "h2" }) {
  return (
    <div className="section-head">
      {num && <p className="section-num">{num}</p>}
      <Tag>{title}</Tag>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}

export function ContactLinks() {
  const links = [
    { label: "email", href: `mailto:${profile.email}`, text: profile.email },
    { label: "linkedin", href: profile.linkedin, text: "alexatinajero", external: true },
    { label: "github", href: profile.github, text: "lexitinajero", external: true },
    { label: "instagram", href: profile.instagram, text: "@lexitinajero", external: true },
  ].filter((l) => l.href);

  return (
    <ul className="contact-links">
      {links.map((l) => (
        <li key={l.label}>
          <span className="label">{l.label}</span>
          <a href={l.href} {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}>
            {l.text}
          </a>
          <span className="contact-arrow" aria-hidden="true">
            ↗
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ResumeButtons() {
  if (!profile.resume) return null;
  return (
    <div className="resume-buttons">
      <a className="button primary" href={profile.resume} target="_blank" rel="noreferrer">
        view my résumé <span aria-hidden="true">↗</span>
      </a>
      <a className="button" href={profile.resume} download="Lexi Tinajero Resume.pdf">
        download pdf <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
