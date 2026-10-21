import { photos, type FeedPhoto } from "../content";

export function Scrapbook({ items = photos }: { items?: FeedPhoto[] }) {
  return (
    <ul className="feed">
      {items.map((p) => (
        <li key={p.src}>
          <figure className="snapshot">
            <img src={p.src} alt={p.caption} width={p.width} height={p.height} decoding="async" />
            {(p.caption || p.place) && (
              <figcaption className="snapshot-caption">
                {p.caption}
                {p.place && <span className="snapshot-place">{p.place}</span>}
              </figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  );
}
