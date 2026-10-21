import { useCallback, useState } from "react";
import { features, type Feature } from "../content";
import { FeatureStory } from "./FeatureStory";
import { Reveal } from "./Reveal";

export function ProjectGrid({ items }: { items: Feature[] }) {
  const [open, setOpen] = useState<Feature | null>(null);
  const close = useCallback(() => setOpen(null), []);

  const sizeFor = (i: number) => (items.length <= 3 ? "" : i === 0 ? " lead" : i < 3 ? " big" : "");

  return (
    <>
      <div className="projects">
        {items.map((f, i) => (
          <Reveal key={f.id} className={`project-wrap${sizeFor(i)}`} delay={(i % 3) * 80}>
            <button className="project" onClick={() => setOpen(f)}>
              {f.cover && <img className="project-image" src={f.cover} alt="" loading="lazy" />}
              <span className="project-text">
                <span className="project-meta">{f.category}</span>
                <span className="project-title">{f.title}</span>
                <span className="project-dek">{f.dek}</span>
                <span className="project-tools">{f.stack.join(" · ")}</span>
                <span className="project-bottom">
                  <span className="project-more">
                    read more <span aria-hidden="true">→</span>
                  </span>
                  <span className="project-year">{f.year}</span>
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      {open && (
        <FeatureStory
          feature={open}
          related={(open.related ?? []).map((id) => features.find((f) => f.id === id)).filter((f) => f !== undefined)}
          onOpen={setOpen}
          onClose={close}
        />
      )}
    </>
  );
}
