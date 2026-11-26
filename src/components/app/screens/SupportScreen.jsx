import { usePassportLang } from "../../../lib/usePassportLang";

export default function SupportScreen() {
  const { lang } = usePassportLang();

  return (
    <div className="ap-screen-enter ap-screen-content">
      <div style={{ padding: "24px 16px", textAlign: "center" }}>
        <h2>{lang === "ar" ? "الدعم والمساعدة" : "Support & Assistance"}</h2>
        <p>{lang === "ar" ? "تواصل مع فريقنا مباشرة" : "Get in touch with our team"}</p>
      </div>
    </div>
  );
}
