import { useEffect, useState } from "react";
import slides from "../data/slides";
import HeroSlide from "./HeroSlide";
import SlideDots from "./SlideDots";

const INTERVAL = 5000; // مدة كل سلايد بالميلي ثانية

export default function HeroSlider({ children }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused]);

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <HeroSlide key={s.id} slide={s} active={i === index} />
      ))}
      <div className="hero-header"><div className="container">{children}</div></div>
      <SlideDots total={slides.length} index={index} onSelect={setIndex} />
    </section>
  );
}
