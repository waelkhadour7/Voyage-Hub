import { Globe } from "lucide-react";
// import heroImg from "../assets/hero.jpg";   // <- فعّله بعد إضافة الصورة

export default function Hero({ children }) {
  return (
    <section
      className="hero"
      // style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="container">
        {children}
        <div className="hero-body">
          <p className="eyebrow"><Globe size={18} /> EVERYTHING YOU NEED, ALL IN ONE PLACE</p>
          <h1>One Portal Complete Travel Solutions</h1>
          <hr className="rule" />
          <p className="lead">
            From airline bookings and hotel reservations to holiday packages and other
            travel services, Voyage Plus helps authorized users manage their travel
            requirements through a single platform.
          </p>
        </div>
      </div>
    </section>
  );
}
