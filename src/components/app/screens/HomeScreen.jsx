import { usePassportLang } from "../../../lib/usePassportLang";

export default function HomeScreen({ onNavigate }) {
  const { lang } = usePassportLang();

  return (
    <div className="ap-screen-enter ap-screen-content">
      <div style={{ padding: "24px 16px", textAlign: "center" }}>
        <h2>{lang === "ar" ? "الشاشة الرئيسية (قيد الإعداد)" : "Home Screen"}</h2>
        <p>{lang === "ar" ? "مرحباً بك في فوياج بلاس" : "Welcome to Voyage Plus Travel App"}</p>
      </div>
    </div>
  );
}
