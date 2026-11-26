import { Globe, MapPin, Plane } from "lucide-react";

const icons = { globe: Globe, pin: MapPin, plane: Plane };

export default function HeroSlide({ slide, active }) {
  const Icon = icons[slide.icon];
  return (
    <div
      className={`slide slide--${slide.theme} ${active ? "is-active" : ""}`}
      style={{ backgroundImage: `url(${slide.image}), var(--fallback)` }}
      aria-hidden={!active}
    >
      <div className="container">
        <div className="hero-body">
          <p className="eyebrow"><Icon size={18} /> {slide.eyebrow}</p>
          <h1>{slide.title}</h1>
          <hr className="rule" />
          <p className="lead">{slide.text}</p>
        </div>
      </div>
    </div>
  );
}
