import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { destinations, sectionBg } from "../data/destinations";
import CountryCard from "./CountryCard";
import CountryDetailModal from "./CountryDetailModal";

const stepOf = (el) =>
  el.children.length > 1 ? el.children[1].offsetLeft - el.children[0].offsetLeft : el.clientWidth;

export default function CountriesSection() {
  const ref = useRef(null);
  const [s, setS] = useState({ active: 0, dots: 1, prev: false, next: true });
  const [activeCountry, setActiveCountry] = useState(null);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const step = stepOf(el);
    const max = el.scrollWidth - el.clientWidth;
    const dots = Math.max(1, Math.round(max / step) + 1);
    setS({
      active: Math.min(dots - 1, Math.round(el.scrollLeft / step)),
      dots,
      prev: el.scrollLeft > 2,
      next: el.scrollLeft < max - 2,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const go = (dir) => ref.current.scrollBy({ left: dir * stepOf(ref.current), behavior: "smooth" });
  const goTo = (i) => ref.current.scrollTo({ left: i * stepOf(ref.current), behavior: "smooth" });

  const selectedItem = destinations.find((d) => d.country === activeCountry);

  return (
    <section className="countries" style={{ backgroundImage: `url(${sectionBg})` }}>
      <div className="container">
        <div className="countries-head">
          <p className="about-eyebrow">Handpicked Destinations</p>
          <h2>Popular Countries to Explore</h2>
          <p>
            We’re curating experiences that match your travel style, timing, and preferences.
            Click any destination below to view details and inquire via WhatsApp.
          </p>
        </div>

        <div className="arrows">
          <button className="arrow" onClick={() => go(-1)} disabled={!s.prev} aria-label="Previous"><ArrowLeft size={18} /></button>
          <button className="arrow" onClick={() => go(1)} disabled={!s.next} aria-label="Next"><ArrowRight size={18} /></button>
        </div>

        <div className="cards" ref={ref} onScroll={measure}>
          {destinations.map((d) => (
            <CountryCard
              key={d.country}
              item={d}
              onClick={() => setActiveCountry(d.country)}
            />
          ))}
        </div>

        <div className="cdots">
          {Array.from({ length: s.dots }, (_, i) => (
            <button key={i} className={i === s.active ? "is-active" : ""} onClick={() => goTo(i)} aria-label={`Go to ${i + 1}`} />
          ))}
        </div>
      </div>

      <CountryDetailModal
        item={selectedItem}
        onClose={() => setActiveCountry(null)}
      />
    </section>
  );
}
