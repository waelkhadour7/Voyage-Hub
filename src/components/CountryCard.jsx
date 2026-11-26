import { MapPin, Plane, Star } from "lucide-react";

export default function CountryCard({ item, onClick }) {
  return (
    <article
      className="country-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick && onClick()}
      style={{ cursor: "pointer" }}
      aria-label={`View budget and tour quote for ${item.country}`}
    >
      <div
        className="country-img"
        style={{ backgroundImage: `url(${item.image}), var(--fallback-sea)` }}
      >
        <span className="premium"><Plane size={12} /> PREMIUM</span>
      </div>
      <div className="country-body">
        <div className="country-meta">
          <span className="country-name"><i><MapPin size={14} /></i>{item.country}</span>
          <span className="country-rating"><Star size={14} fill="currentColor" />{item.rating}</span>
        </div>
        <h3>{item.title}</h3>
      </div>
    </article>
  );
}
