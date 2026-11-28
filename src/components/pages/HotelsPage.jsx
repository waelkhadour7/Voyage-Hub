import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, Heart, Search } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import ChatBot from "../ChatBot";
import HotelDetailModal from "../HotelDetailModal";
import ContactMenu from "../ContactMenu";
import { HOTEL_CITIES, hotels } from "../../data/hotels";
import { usePassportLang } from "../../lib/usePassportLang";
import "../../styles-hotels-grid.css";

export default function HotelsPage({ onBackToHome }) {
  const { lang, dir } = usePassportLang();
  const isRtl = dir === "rtl";

  const [activeHotel, setActiveHotel] = useState(null);
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [savedNotice, setSavedNotice] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem("voyage.hotelFavorites.v1")); return Array.isArray(saved) ? saved.filter((id) => typeof id === "string") : []; } catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem("voyage.hotelFavorites.v1", JSON.stringify(favorites)); } catch {} }, [favorites]);
  const resetFilters = () => { setSelectedCity("all"); setSelectedPrice("all"); setQuery(""); setFavoritesOnly(false); };
  const toggleFavorite = (id) => { const adding = !favorites.includes(id); setFavorites((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]); setSavedNotice(adding ? (lang === "ar" ? "تمت الإضافة للمفضلة" : "Saved") : ""); };
  useEffect(() => { if (!savedNotice) return; const timer = setTimeout(() => setSavedNotice(""), 2000); return () => clearTimeout(timer); }, [savedNotice]);
  const cityNames = { jakarta: "جاكرتا", dubai: "دبي", singapore: "سنغافورة", phuket: "فوكيت", bali: "بالي" };
  const priceLabels = { under200: lang === "ar" ? "أقل من ٢٠٠ دولار" : "Under $200", "200-400": lang === "ar" ? "٢٠٠–٤٠٠ دولار" : "$200–$400", over400: lang === "ar" ? "أكثر من ٤٠٠ دولار" : "Over $400" };

  const handleBack = () => {
    try {
      Haptics.impact({ style: ImpactStyle.Light });
    } catch {}
    if (onBackToHome) onBackToHome();
  };

  const filteredHotels = hotels.filter((h) => {
    if (query.trim() && !`${h.name} ${h.location} ${h.country}`.toLowerCase().includes(query.trim().toLowerCase())) return false;
    if (favoritesOnly && !favorites.includes(h.id)) return false;
    // City filter
    if (selectedCity !== "all" && h.cityId !== selectedCity) return false;

    // Price filter
    if (selectedPrice === "under200" && h.priceNum >= 200) return false;
    if (selectedPrice === "200-400" && (h.priceNum < 200 || h.priceNum > 400)) return false;
    if (selectedPrice === "over400" && h.priceNum <= 400) return false;

    return true;
  });

  return (
    <div className="hg-page-wrap" dir={dir}>
      {/* Native App Top Bar */}
      <header className="hg-native-appbar">
        <button
          type="button"
          className="hg-appbar-back"
          onClick={handleBack}
          aria-label={lang === "ar" ? "العودة للرئيسية" : "Back to Home"}
        >
          {isRtl ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          <span>{lang === "ar" ? "الرئيسية" : "Home"}</span>
        </button>

        <h1 className="hg-appbar-title">
          {lang === "ar" ? "الفنادق والإقامة" : "Hotels & Stays"}
        </h1>

        <ContactMenu />
      </header>

      {/* Main Hotels Exploration Grid */}
      <main className="hg-container">
        <div className="container">
          {/* Header Title */}
          <div className="hg-head">
            <div className="hg-head-text">
              <h2>{lang === "ar" ? "الفنادق الفاخرة" : "Hotels"}</h2>
              <p>{lang === "ar" ? "ابحث عن الفندق المثالي لإقامتك القادمة" : "Find hotels for your next stay!"}</p>
            </div>
          </div>

          <label className="hg-search"><Search size={19} aria-hidden="true" /><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={lang === "ar" ? "ابحث عن فندق أو وجهة" : "Search hotels or destinations"} aria-label={lang === "ar" ? "ابحث عن فندق أو وجهة" : "Search hotels or destinations"} /></label>

          {/* Filter Dropdowns Row */}
          <div className="hg-filter-row">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="hg-select"
              aria-label={lang === "ar" ? "التصفية حسب الوجهة" : "Filter by destination"}
            >
              {HOTEL_CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id === "all" ? (lang === "ar" ? "كل الوجهات" : "All destinations") : (lang === "ar" ? cityNames[c.id] || c.name : `${c.name} (${c.country})`)}
                </option>
              ))}
            </select>

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="hg-select"
              aria-label={lang === "ar" ? "التصفية حسب السعر" : "Filter by price"}
            >
              <option value="all">{lang === "ar" ? "كل الأسعار" : "All prices"}</option>
              <option value="under200">{priceLabels.under200}</option>
              <option value="200-400">{priceLabels["200-400"]}</option>
              <option value="over400">{priceLabels.over400}</option>
            </select>

            <button type="button" className={`hg-saved-filter ${favoritesOnly ? "is-active" : ""}`} onClick={() => setFavoritesOnly(!favoritesOnly)} aria-pressed={favoritesOnly}><Heart size={16} fill={favoritesOnly ? "currentColor" : "none"} /> {lang === "ar" ? "المفضلة" : "Saved"} ({favorites.length})</button>
          </div>

          {/* Most Explored Destinations */}
          <div className="hg-explored-section">
            <div className="hg-section-title">
              {lang === "ar" ? "الوجهات الأكثر استكشافاً" : "Most Explored"}
            </div>
            <div className="hg-cities-carousel">
              {HOTEL_CITIES.filter((c) => c.id !== "all").map((city) => (
                <button
                  key={city.id}
                  type="button"
                  className="hg-city-card"
                  onClick={() => setSelectedCity(city.id)}
                  aria-pressed={selectedCity === city.id}
                >
                  <img className="hg-city-image" src={city.image} alt="" onError={(e) => { e.currentTarget.hidden = true; }} /><div className="hg-city-overlay" />
                  <div className="hg-city-info">
                    <strong>{lang === "ar" ? cityNames[city.id] || city.name : city.name}</strong>
                    <small>{lang === "ar" ? "وجهة" : city.country}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {(selectedCity !== "all" || selectedPrice !== "all" || favoritesOnly || query.trim()) && <div className="hg-active-filters" aria-label={lang === "ar" ? "الفلاتر النشطة" : "Active filters"}>
            {selectedCity !== "all" && <button type="button" onClick={() => setSelectedCity("all")} aria-label={lang === "ar" ? "إزالة فلتر الوجهة" : "Remove destination filter"}>{lang === "ar" ? cityNames[selectedCity] : HOTEL_CITIES.find((city) => city.id === selectedCity)?.name} ×</button>}
            {selectedPrice !== "all" && <button type="button" onClick={() => setSelectedPrice("all")} aria-label={lang === "ar" ? "إزالة فلتر السعر" : "Remove price filter"}>{priceLabels[selectedPrice]} ×</button>}
            {favoritesOnly && <button type="button" onClick={() => setFavoritesOnly(false)} aria-label={lang === "ar" ? "إزالة فلتر المفضلة" : "Remove saved filter"}>{lang === "ar" ? "المفضلة" : "Saved"} ×</button>}
            {query.trim() && <button type="button" onClick={() => setQuery("")} aria-label={lang === "ar" ? "مسح البحث" : "Clear search"}>{query} ×</button>}
          </div>}

          {/* Hotels Cards Grid */}
          <div className="hg-section-title">
            {lang === "ar" ? "الفنادق المتاحة" : "Featured Hotels"}
          </div>
          <p className="hg-results" role="status">{lang === "ar" ? `${filteredHotels.length} نتيجة` : `${filteredHotels.length} ${filteredHotels.length === 1 ? "stay" : "stays"}`} · {lang === "ar" ? "الأسعار للتوضيح وتحتاج تأكيداً" : "Sample prices; confirm availability and rates"}</p>
          {filteredHotels.length === 0 && <div className="hg-empty"><strong>{lang === "ar" ? "لا توجد فنادق مطابقة" : "No stays found"}</strong><p>{lang === "ar" ? "جرّب تغيير البحث أو الفلاتر." : "Try a different search or reset your filters."}</p><div className="hg-empty-actions"><button type="button" onClick={resetFilters}>{lang === "ar" ? "مسح الفلاتر" : "Clear filters"}</button><button type="button" onClick={resetFilters}>{lang === "ar" ? "تصفح كل الوجهات" : "Browse all destinations"}</button></div></div>}

          <div className="hg-hotels-grid">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="hg-hotel-card"
              >
                <div className="hg-card-hero"><span className="hg-image-fallback" aria-hidden="true">VOYAGE PLUS</span><img src={hotel.image} alt="" className="hg-hotel-image" onError={(e) => { e.currentTarget.hidden = true; }} />
                  <button type="button" className="hg-fav-btn" aria-label={lang === "ar" ? `${favorites.includes(hotel.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}: ${hotel.name}` : `${favorites.includes(hotel.id) ? "Remove from" : "Add to"} saved hotels: ${hotel.name}`} aria-pressed={favorites.includes(hotel.id)} onClick={() => toggleFavorite(hotel.id)}>
                    <Heart size={18} fill={favorites.includes(hotel.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                <div className="hg-card-body">
                  <div className="hg-card-title-row">
                    <h3 className="hg-hotel-name">{hotel.name}</h3>
                  </div>

                  <span className="hg-location">
                    <MapPin size={13} /> {hotel.location}
                  </span>

                  <span className="hg-sample-label">{lang === "ar" ? "بيانات توضيحية" : "Illustrative listing"}</span>

                  <div className="hg-card-footer">
                    <div>
                      <span className="hg-price-num">{hotel.pricePerNight}</span>{" "}<span className="hg-price-unit">{lang === "ar" ? "سعر توضيحي / ليلة" : "Sample price / night"}</span>
                    </div>
                    <button type="button" className="hg-view-details" onClick={() => setActiveHotel(hotel)} aria-label={lang === "ar" ? `عرض تفاصيل ${hotel.name}` : `View details for ${hotel.name}`}>{lang === "ar" ? "عرض التفاصيل" : "View details"} {isRtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detailed Hotel Modal Sheet */}
      <HotelDetailModal
        key={activeHotel?.id || "closed"}
        hotel={activeHotel}
        lang={lang}
        onClose={() => setActiveHotel(null)}
      />

      {/* Floating Buttons */}
      <ChatBot />
      <div className="hg-toast" role="status" aria-live="polite">{savedNotice}</div>
    </div>
  );
}
