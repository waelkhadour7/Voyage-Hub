import { usePassportLang } from "../../../lib/usePassportLang";

export default function ServicesScreen() {
  const { lang } = usePassportLang();

  return (
    <div className="ap-screen-enter ap-screen-content">
      <div style={{ padding: "24px 16px", textAlign: "center" }}>
        <h2>{lang === "ar" ? "خدماتنا" : "Our Services"}</h2>
        <p>{lang === "ar" ? "حجوزات طيران، فنادق، وتأشيرات" : "Flight bookings, hotels, visas, and transfers"}</p>
      </div>
    </div>
  );
}
