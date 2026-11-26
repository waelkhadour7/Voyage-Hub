import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import Logo from "../Logo";
import ContactMenu from "../ContactMenu";
import { appText } from "../../data/appText";
import { usePassportLang } from "../../lib/usePassportLang";

export default function AppHeader({ title, showBack, onBack }) {
  const { lang, t, dir } = usePassportLang();
  const isRtl = dir === "rtl";

  return (
    <header className="ap-header" dir={dir}>
      <div className="ap-header-start">
        {showBack ? (
          <button
            type="button"
            className="ap-btn-back"
            onClick={onBack}
            aria-label={t(appText.back)}
          >
            {isRtl ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          </button>
        ) : (
          <Logo />
        )}
        <h1 className="ap-header-title">{title || t(appText.appName)}</h1>
      </div>

      <div className="ap-header-end">
        <ContactMenu />
      </div>
    </header>
  );
}
