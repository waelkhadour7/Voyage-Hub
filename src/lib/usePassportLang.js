import { useState } from "react";

export function usePassportLang() {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem("voyage_passport_lang");
      if (saved === "en" || saved === "ar") return saved;
      return (navigator.language || "").startsWith("ar") ? "ar" : "en";
    } catch {
      return "en";
    }
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("voyage_passport_lang", newLang);
    } catch {
      // Storage fallback
    }
  };

  const t = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.en || "";
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  return { lang, setLang, t, dir };
}
