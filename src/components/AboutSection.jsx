import about from "../data/about";
import CtaButton from "./CtaButton";

export default function AboutSection() {
  return (
    <section className="about container">
      <div className="about-media">
        <div className="about-main" style={{ backgroundImage: `url(${about.mainImage})` }}>
          <h3>ABOUT<br />VOYAGE PLUS</h3>
        </div>
        <div className="about-thumb" style={{ backgroundImage: `url(${about.thumbImage})` }} />
      </div>

      <div className="about-text">
        <p className="about-eyebrow">About Us</p>
        <h2>Built on Trust.<br />Driven by Experience.<br />Focused on You.</h2>
        <p>
          <span className="hl">Voyage Plus Travel LLC</span> is a specialized outbound travel
          division dedicated to creating seamless and memorable travel experiences for
          individuals, families, and corporate clients.
        </p>
        <p>
          Built on years of industry expertise, we combine reliability, personalized service,
          and professional travel solutions to make every journey simple, comfortable, and memorable.
        </p>
        <CtaButton>LEARN MORE</CtaButton>
      </div>
    </section>
  );
}
