import type { Feature } from "../content";
import { Modal } from "./Modal";

export function FeatureStory({
  feature,
  related,
  onOpen,
  onClose,
}: {
  feature: Feature;
  related: Feature[];
  onOpen: (f: Feature) => void;
  onClose: () => void;
}) {
  const details = [
    ["my role", feature.role],
    ["when", feature.year],
    ["type", feature.category],
  ];

  return (
    <Modal label={feature.title} onClose={onClose} className="story">
      {feature.cover && <img className="story-cover" src={feature.cover} alt="" />}

      <div className="story-body">
        <h2 className="story-title">{feature.title}</h2>
        <p className="story-dek">{feature.dek}</p>

        <dl className="story-info">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <h3 className="story-heading">what i built</h3>
        <p className="story-lede">{feature.overview}</p>
        <ul className="story-steps">
          {feature.story.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        {feature.outcome && (
          <p className="story-outcome">{feature.outcome}</p>
        )}

        <h3 className="story-heading">tools i used</h3>
        <ul className="tags">
          {feature.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        {feature.gallery.length > 0 && (
          <>
            <h3 className="story-heading">pictures</h3>
            <div className="story-gallery">
              {feature.gallery.map((g) => (
                <figure key={g.src}>
                  <a href={g.src} target="_blank" rel="noreferrer">
                    <img src={g.src} alt={g.caption} loading="lazy" />
                  </a>
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </>
        )}

        {feature.links.length > 0 && (
          <>
            <h3 className="story-heading">links</h3>
            <ul className="story-links">
              {feature.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noreferrer">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
        {related.length > 0 && (
          <>
            <h3 className="story-heading">{feature.id === "paws" ? "pieces of this project" : "related"}</h3>
            <ul className="story-related">
              {related.map((r) => (
                <li key={r.id}>
                  <button onClick={() => onOpen(r)}>
                    <span>{r.title}</span>
                    <span className="story-related-meta">{r.year}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

      </div>
    </Modal>
  );
}
