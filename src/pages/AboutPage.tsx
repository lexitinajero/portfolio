import { about, certifications, courses, currently, education, experience, photoPreview, photos, skills } from "../content";
import { ResumeButtons, SectionHead } from "../components/bits";
import { Reveal } from "../components/Reveal";
import { Scrapbook } from "../components/Scrapbook";
import { pageHref } from "../router";
import lexiPhoto from "../assets/lexi.jpg";

export function AboutPage() {
  return (
    <>
      <section className="section page-top">
        <div className="section-head">
          <p className="section-num">~/about</p>
          <h1>
            hi, i’m lexi <span aria-hidden="true">♡</span>
          </h1>
        </div>
        <div className="about">
          <Reveal>
            <figure className="photo">
              <img src={lexiPhoto} alt="Lexi Tinajero smiling outdoors on campus" width={654} height={900} />
            </figure>
          </Reveal>

          <Reveal className="about-text" delay={120}>
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="currently">
              <p className="label">currently</p>
              <ul>
                {currently.map((c) => (
                  <li key={c.label}>
                    <span className="currently-label">{c.label}</span>
                    <span>{c.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <SectionHead num="school.md" title="school" />
        <Reveal className="card school">
          <h3>{education.school}</h3>
          <p className="muted">
            {education.degree} · {education.dates}
          </p>
          <div className="school-lists">
            <div>
              <p className="label">involved in</p>
              <ul className="list">
                {education.involved.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label">awards</p>
              <ul className="list">
                {education.awards.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {courses.map((group) => (
          <Reveal key={group.group} className="card classes">
            <p className="label">classes · {group.group}</p>
            <ul>
              {group.classes.map((c) => (
                <li key={c.code}>
                  <span className="course-code">{c.code}</span>
                  <span>{c.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <section className="section">
        <SectionHead num="experience.log" title="experience" />
        <div className="timeline">
          {experience.map((job) => (
            <Reveal key={job.role + job.dates}>
              <article className="job">
                <p className="job-dates">{job.dates}</p>
                <div>
                  <h3>{job.role}</h3>
                  <p className="muted">{job.org}</p>
                  <ul className="list">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <ResumeButtons />
      </section>

      <section className="section">
        <SectionHead num="skills.json" title="skills" />
        <div className="toolkit">
          {Object.entries(skills).map(([group, items]) => (
            <Reveal key={group} className="card">
              <p className="label">{group}</p>
              <ul className="tags">
                {items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
          <Reveal className="card">
            <p className="label">certifications</p>
            <ul className="list tight">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <SectionHead num="off-the-clock.txt" title="off the clock" intro="a few favorites from outside the lab." />
        <Reveal>
          <Scrapbook items={photoPreview.map((name) => photos.find((p) => p.src.endsWith(name))).filter((p) => p !== undefined)} />
          <p className="see-all">
            <a className="button" href={pageHref("moments")}>
              see all {photos.length} moments <span aria-hidden="true">→</span>
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}
