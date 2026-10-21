import { useCallback, useState } from "react";
import { about, features, profile } from "../content";
import { ContactLinks, ResumeButtons, SectionHead } from "../components/bits";
import { ProjectGrid } from "../components/ProjectGrid";
import { Reveal } from "../components/Reveal";
import { Terminal } from "../components/Terminal";
import { TypedLine } from "../components/TypedLine";
import { Typewriter } from "../components/Typewriter";
import { pageHref } from "../router";
import lexiPhoto from "../assets/lexi.jpg";

const homePicks = ["paws", "spot-nav", "plastic"];

export function HomePage({ ready }: { ready: boolean }) {
  const [typed, setTyped] = useState(false);
  const doneTyping = useCallback(() => setTyped(true), []);

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="whoami">
            <span className="prompt">$</span> {ready && <TypedLine text="whoami" onDone={doneTyping} />}
          </p>
          <div className={typed ? "hero-answer shown" : "hero-answer"}>
            <h1>
              lexi tinajero<span className="cursor" aria-hidden="true" />
            </h1>
            <p className="roles">
              <span aria-hidden="true">&gt; </span>
              <Typewriter words={profile.roles} />
            </p>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-buttons">
              <a className="button primary" href={pageHref("projects")}>
                see my projects
              </a>
              <a className="button" href="#contact">
                get in touch
              </a>
            </div>
          </div>
        </div>

        <div className={typed ? "hero-terminal hero-answer shown" : "hero-terminal hero-answer"}>
          <Terminal />
        </div>
      </section>

      <section className="section">
        <SectionHead num="about.md" title="about me" />
        <Reveal className="about about-short">
          <figure className="photo small">
            <img src={lexiPhoto} alt="Lexi Tinajero smiling outdoors on campus" width={654} height={900} />
          </figure>
          <div className="about-text">
            <p>{about[0]}</p>
            <a className="more-link" href={pageHref("about")}>
              more about me <span aria-hidden="true">{"→\uFE0E"}</span>
            </a>
          </div>
        </Reveal>
      </section>

      <section className="section">
        <SectionHead num="projects/" title="projects" intro="a few favorites. click one for the details." />
        <ProjectGrid items={homePicks.map((id) => features.find((f) => f.id === id)!)} />
        <p className="see-all">
          <a className="button" href={pageHref("projects")}>
            see all projects <span aria-hidden="true">{"→\uFE0E"}</span>
          </a>
        </p>
      </section>

      <section id="contact" className="section">
        <SectionHead num="contact.txt" title="contact" intro="have a project in mind, an opportunity to share, or a place i should visit? say hi." />
        <Reveal>
          <ContactLinks />
          <ResumeButtons />
        </Reveal>
      </section>
    </>
  );
}
