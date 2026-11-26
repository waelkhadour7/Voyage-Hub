import { useState } from "react";
import { Search, Check, Heart, Plus } from "lucide-react";
import { worldPaths } from "../../data/worldPaths";

export default function CountryList({
  visitedCodes = [],
  wishlistCodes = [],
  onSelectCountry,
  lang,
  t,
}) {
  const [search, setSearch] = useState("");

  const filtered = worldPaths.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const name = (item.name || "").toLowerCase();
    const code = (item.id || "").toLowerCase();
    return name.includes(q) || code.includes(q);
  });

  return (
    <div className="pp-list-wrap">
      {/* Search Input */}
      <div className="pp-search-box">
        <Search size={18} className="pp-search-icon" aria-hidden="true" />
        <input
          type="text"
          className="pp-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={lang === "ar" ? "بحث عن دولة..." : "Search country..."}
          dir="auto"
          aria-label={lang === "ar" ? "بحث عن دولة" : "Search country list"}
        />
      </div>

      <div className="pp-country-grid" role="list">
        {filtered.map((item) => {
          const isVisited = visitedCodes.includes(item.id);
          const isWishlist = wishlistCodes.includes(item.id);

          return (
            <button
              key={item.id}
              type="button"
              role="listitem"
              className={`pp-list-card ${isVisited ? "is-visited" : isWishlist ? "is-wishlist" : ""}`}
              onClick={() => onSelectCountry(item)}
            >
              <div className="pp-list-card-head">
                <span className="pp-code-badge">{item.id}</span>
                <div className="pp-list-badges">
                  {isVisited && (
                    <span className="pp-badge-visited">
                      <Check size={12} />
                      <span>{lang === "ar" ? "مزارة" : "Visited"}</span>
                    </span>
                  )}
                  {isWishlist && (
                    <span className="pp-badge-wishlist">
                      <Heart size={12} fill="currentColor" />
                    </span>
                  )}
                </div>
              </div>
              <strong className="pp-list-name">{item.name}</strong>
              <div className="pp-list-action">
                <Plus size={14} />
                <span>{lang === "ar" ? "عرض / إضافة" : "View / Add"}</span>
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="pp-empty-list">
            {lang === "ar" ? "لم يتم العثور على نتائج" : "No matching countries found"}
          </div>
        )}
      </div>
    </div>
  );
}
