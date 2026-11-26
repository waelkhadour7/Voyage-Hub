import { usePassportLang } from "../../../lib/usePassportLang";

export default function MoreScreen() {
  const { lang } = usePassportLang();

  return (
    <div className="ap-screen-enter ap-screen-content">
      <div style={{ padding: "24px 16px", textAlign: "center" }}>
        <h2>{lang === "ar" ? "المزيد" : "More Options"}</h2>
        <p>{lang === "ar" ? "إعدادات التطبيق والتسجيل كوكيل" : "App settings, Agent sign up, and info"}</p>
      </div>
    </div>
  );
}
