import { ShareIcon } from "../icons/shareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  const embedUrl = type === "youtube"
    ? link.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/")
    : link.replace("x.com", "twitter.com");

  return (
    <article className="content-card">
      <header className="content-card-header">
        <span className={`content-type-icon ${type}`}>{type === "youtube" ? "▶" : "𝕏"}</span>
        <div className="content-card-heading">
          <span className="content-type-label">{type === "youtube" ? "YOUTUBE" : "TWITTER"}</span>
          <h3 title={title}>{title}</h3>
        </div>
        <a className="card-open-link" href={link} target="_blank" rel="noreferrer" aria-label={`Open ${title}`}>
          <ShareIcon />
        </a>
      </header>
      <div className="content-card-body">
        {type === "youtube" ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="twitter-preview">
            <span className="twitter-mark">𝕏</span>
            <p>View this post on X to see the full conversation.</p>
            <a href={embedUrl} target="_blank" rel="noreferrer">Open post <span aria-hidden="true">↗</span></a>
          </div>
        )}
      </div>
    </article>
  );
}
