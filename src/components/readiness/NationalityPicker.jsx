import { useEffect, useState } from "react";
import { Search, Clock, Check } from "lucide-react";
import { nationalities } from "../../data/readiness";

export default function NationalityPicker({ selected, onSelect, lang, t }) {
  const [search, setSearch] = useState("");
  const [recents, setRecents] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("voyage_recent_nationalities");
      if (saved) setRecents(JSON.parse(saved));
    } catch {
      // Storage unavailable fallback
    }
  }, []);

  const handleChoose = (item) => {
    onSelect(item);
    try {
      const updated = [item.code, ...recents.filter((c) => c !== item.code)].slice(0, 3);
      setRecents(updated);
      localStorage.setItem("voyage_recent_nationalities", JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const filtered = nationalities.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const nameEn = (item.name?.en || "").toLowerCase();
    const nameAr = (item.name?.ar || "").toLowerCase();
    const code = (item.code || "").toLowerCase();
    return nameEn.includes(q) || nameAr.includes(q) || code.includes(q);
  });

  const recentItems = nationalities.filter((item) => recents.includes(item.code));

  return (
    <div className="rd-step-body">
      <h3 id="rd-step1-title" className="rd-step-title">
        {lang === "ar" ? "اختر جنسيتك" : "Select Your Nationality"}
      </h3>
      <p className="rd-step-desc">
        {lang === "ar"
          ? "حدد جواز السفر الذي ستسافر به لمعرفة متطلبات التأشيرة الدقيقة."
          : "Choose the passport you will be traveling with to see exact visa rules."}
      </p>

      {/* Search Input */}
      <div className="rd-search-box">
        <Search size={18} className="rd-search-icon" aria-hidden="true" />
        <input
          type="text"
          className="rd-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={lang === "ar" ? "بحث عن دولة..." : "Search country..."}
          dir="auto"
          aria-label={lang === "ar" ? "بحث عن دولة" : "Search nationality"}
        />
      </div>

      {/* Recents */}
      {recentItems.length > 0 && !search && (
        <div className="rd-recents-wrap">
          <span className="rd-recents-label">
            <Clock size={12} /> {lang === "ar" ? "الأحدث:" : "Recent:"}
          </span>
          <div className="rd-recents-chips">
            {recentItems.map((item) => (
              <button
                key={item.code}
                type="button"
                className={`rd-recent-chip ${selected?.code === item.code ? "is-selected" : ""}`}
                onClick={() => handleChoose(item)}
              >
                {item.iso && (
                  <img
                    src={`https://flagcdn.com/w40/${item.iso}.png`}
                    alt=""
                    className="rd-flag-icon"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <span className="rd-badge-code">{item.code}</span>
                <span>{t(item.name)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* List */}
      <div className="rd-nat-list" role="radiogroup" aria-labelledby="rd-step1-title">
        {filtered.map((item) => {
          const isSelected = selected?.code === item.code;
          return (
            <button
              key={item.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`rd-nat-row ${isSelected ? "is-selected" : ""}`}
              onClick={() => handleChoose(item)}
            >
              {item.iso && (
                <img
                  src={`https://flagcdn.com/w40/${item.iso}.png`}
                  alt=""
                  className="rd-flag-icon"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
              <span className="rd-badge-code">{item.code}</span>
              <span className="rd-nat-name">{t(item.name)}</span>
              {isSelected && <Check size={18} className="rd-check-icon" />}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="rd-empty-list">
            {lang === "ar" ? "لم يتم العثور على دولة مطابقة" : "No matching nationality found"}
          </div>
        )}
      </div>
    </div>
  );
}
