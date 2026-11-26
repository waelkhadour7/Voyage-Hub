import { usePassportLang } from "../../../lib/usePassportLang";

export default function ExploreScreen() {
  const { lang } = usePassportLang();

  return (
    <div className="ap-screen-enter ap-screen-content">
      <div style={{ padding: "24px 16px", textAlign: "center" }}>
        <h2>{lang === "ar" ? "استكشف الوجهات" : "Explore Destinations"}</h2>
        <p>{lang === "ar" ? "استعرض أجمل الوجهات السياحية" : "Discover handpicked travel destinations"}</p>
      </div>
    </div>
  );
}
