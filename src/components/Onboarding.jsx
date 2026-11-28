import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Plane, Snowflake, Sun } from "lucide-react";
import "../styles-onboarding.css";

const slides = [
  { label: "WELCOME TO VOYAGE PLUS", title: "Your journey starts here.", description: "Discover inspiring places and make your next escape feel effortless.", icon: Plane },
  { label: "FIND YOUR NEXT ADVENTURE", title: "Discover Iceland.", description: "Dream of glaciers, striking landscapes and unforgettable moments in nature.", icon: Snowflake },
  { label: "EXPLORE SOMETHING NEW", title: "Journey into the desert.", description: "Imagine golden dunes, wide open skies and a trip made for discovery.", icon: Sun },
];

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0);
  const touchStart = useRef(null);
  const slide = slides[step];
  const Icon = slide.icon;
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);
  const handleTouchEnd = (event) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy) * 1.2) return;
    setStep((current) => Math.max(0, Math.min(slides.length - 1, current + (dx < 0 ? 1 : -1))));
  };
  return <section className="onboard" role="dialog" aria-modal="true" aria-labelledby="onboard-title" onTouchStart={(event) => { if (event.touches.length === 1) touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={handleTouchEnd} onTouchCancel={() => { touchStart.current = null; }}>
    {slides.map((item, index) => <div key={item.label} className={`onboard-art onboard-art-${index}${index === step ? " is-active" : ""}`} aria-hidden="true" />)}
    <div className="onboard-shade" aria-hidden="true" />
    <header className="onboard-top">
      {step > 0 ? <button className="onboard-back" type="button" onClick={() => setStep(step - 1)} aria-label="Previous screen"><ArrowLeft size={20} /></button> : <span className="onboard-brand"><img src={`${import.meta.env.BASE_URL}logo-mark.png`} alt="" /> VOYAGE PLUS</span>}
      <button className="onboard-skip" type="button" onClick={onFinish}>Skip</button>
    </header>
    <div className="onboard-content">
      <div key={slide.label} className="onboard-copy" aria-live="polite">
        <div className="onboard-icon" aria-hidden="true"><Icon size={23} strokeWidth={1.8} /></div>
        <p className="onboard-label">{slide.label}</p>
        <h1 id="onboard-title">{slide.title}</h1>
        <p className="onboard-description">{slide.description}</p>
      </div>
      <div className="onboard-bottom">
        <div className="onboard-dots" role="group" aria-label="Choose welcome screen">{slides.map((item, index) => <button key={item.label} type="button" className={index === step ? "active" : ""} onClick={() => setStep(index)} aria-label={`Go to screen ${index + 1}: ${item.label}`} aria-current={index === step ? "step" : undefined} />)}</div>
        <button type="button" className="onboard-next" onClick={() => step === slides.length - 1 ? onFinish() : setStep(step + 1)}>{step === slides.length - 1 ? "Get started" : "Continue"}<ArrowRight size={18} /></button>
      </div>
    </div>
  </section>;
}
