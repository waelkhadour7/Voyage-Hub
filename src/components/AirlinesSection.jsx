import airlines from "../data/airlines";
import AirlineCard from "./AirlineCard";

export default function AirlinesSection() {
  return (
    <section className="airlines">
      <div className="container">
        <div className="countries-head">
          <p className="about-eyebrow">Global Airline Partners</p>
          <h2>Fly Further With Trusted Airlines.</h2>
          <p>Stronger partnerships. More destinations. A world of possibilities for your business.</p>
        </div>

        <div className="marquee">
          <div className="marquee-track">
            {airlines.map((a) => <AirlineCard key={a.name} airline={a} />)}
            {/* نسخة مكررة لتكتمل الحركة بلا فراغ */}
            {airlines.map((a) => (
              <div key={`dup-${a.name}`} aria-hidden="true" style={{ display: "contents" }}>
                <AirlineCard airline={a} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
