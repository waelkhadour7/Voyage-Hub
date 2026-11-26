import { useEffect, useRef, useState } from "react";
import { Compass, Globe, Plus, Sparkles, RefreshCw } from "lucide-react";
import { usePassportLang } from "../../lib/usePassportLang";
import { passportText } from "../../data/passportText";
import { loadStore, saveStore } from "../../lib/storage";
import { addTrip, visitedCountries } from "../../lib/passport";
import PassportTabs from "./PassportTabs";
import WorldMap from "./WorldMap";
import CountryList from "./CountryList";
import TripForm from "./TripForm";
import "../../styles-passport.css";

const MOCK_EXAMPLE_STORE = {
  version: 1,
  isExample: true,
  traveler: { name: "Explorer" },
  trips: [
    { id: "e1", country: "PH", start: { y: 2023, m: 5 }, city: "Manila" },
    { id: "e2", country: "CN", start: { y: 2023, m: 10 }, city: "Beijing" },
    { id: "e3", country: "NP", start: { y: 2024, m: 2 }, city: "Kathmandu" },
    { id: "e4", country: "KR", start: { y: 2024, m: 4 }, city: "Seoul" },
  ],
  wishlist: ["JP", "TH"],
};

export default function PassportSection() {
  const { lang, setLang, t, dir } = usePassportLang();
  const [store, setStore] = useState(() => loadStore());
  const [activeTab, setActiveTab] = useState("map");
  const [viewMode, setViewMode] = useState("map"); // "map" | "list"
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showTripForm, setShowTripForm] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef(null);

  // Lazy loading observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Sync to local storage if not in example mode
  useEffect(() => {
    if (!store.isExample) {
      saveStore(store);
    }
  }, [store]);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setShowTripForm(true);
  };

  const handleAddTripSubmit = (tripData) => {
    try {
      const updated = addTrip(store, tripData);
      setStore(updated);
      setShowTripForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleExample = () => {
    if (store.isExample) {
      setStore(loadStore());
    } else {
      setStore(MOCK_EXAMPLE_STORE);
    }
  };

  const visitedList = visitedCountries(store);

  return (
    <section className="pp-section" id="passport-section" dir={dir} ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="pp-card">
          {store.isExample && (
            <div className="pp-example-ribbon">
              <span>{t(passportText.exampleBanner)}</span>
              <button type="button" onClick={handleToggleExample}>
                {t(passportText.exitExample)}
              </button>
            </div>
          )}

          <div className="pp-head">
            <div className="pp-badge">
              <Compass size={14} />
              <span>{t(passportText.eyebrow)}</span>
            </div>

            <div className="pp-head-actions">
              <button
                type="button"
                className="pp-example-toggle"
                onClick={handleToggleExample}
              >
                <Sparkles size={14} />
                <span>{store.isExample ? t(passportText.exitExample) : t(passportText.tryExample)}</span>
              </button>

              <button
                type="button"
                className="pp-lang-toggle"
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                aria-label="Toggle language"
              >
                {lang === "en" ? "عربي" : "EN"}
              </button>
            </div>
          </div>

          <div className="pp-hero">
            <h2 className="pp-title">{t(passportText.headline)}</h2>
            <p className="pp-subtitle">{t(passportText.subtitle)}</p>

            <div className="pp-souvenir-bar">
              <span className="pp-souvenir-tag">
                🛂 {t(passportText.souvenirNote)}
              </span>
              <span className="pp-privacy-tag">
                🔒 {t(passportText.privacyNote)}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <PassportTabs activeTab={activeTab} onTabChange={setActiveTab} t={t} />

          {/* Lazy loaded interactive content */}
          {isIntersecting && (
            <div className="pp-content-wrap">
              {activeTab === "map" && (
                <div className="pp-map-container">
                  <div className="pp-view-toggle-bar">
                    <div className="pp-view-switches">
                      <button
                        type="button"
                        className={`pp-view-btn ${viewMode === "map" ? "is-active" : ""}`}
                        onClick={() => setViewMode("map")}
                      >
                        <Globe size={14} />
                        <span>{lang === "ar" ? "عرض الخريطة" : "Map View"}</span>
                      </button>
                      <button
                        type="button"
                        className={`pp-view-btn ${viewMode === "list" ? "is-active" : ""}`}
                        onClick={() => setViewMode("list")}
                      >
                        <span>{lang === "ar" ? "قائمة الدول" : "List View"}</span>
                      </button>
                    </div>

                    <span className="pp-visited-count-badge">
                      {lang === "ar"
                        ? `${visitedList.length} دول مزارة`
                        : `${visitedList.length} Countries Visited`}
                    </span>
                  </div>

                  {viewMode === "map" ? (
                    <WorldMap
                      visitedCodes={visitedList}
                      wishlistCodes={store.wishlist || []}
                      onSelectCountry={handleSelectCountry}
                      lang={lang}
                      t={t}
                    />
                  ) : (
                    <CountryList
                      visitedCodes={visitedList}
                      wishlistCodes={store.wishlist || []}
                      onSelectCountry={handleSelectCountry}
                      lang={lang}
                      t={t}
                    />
                  )}
                </div>
              )}

              {activeTab === "booklet" && (
                <div className="pp-placeholder-tab">
                  <h3>{t(passportText.tabs.booklet)}</h3>
                  <p>{lang === "ar" ? "كتيب الجواز بصفحات الأختام الثنائية" : "Booklet with flip-through pages"}</p>
                </div>
              )}

              {activeTab === "stats" && (
                <div className="pp-placeholder-tab">
                  <h3>{t(passportText.tabs.stats)}</h3>
                  <p>{lang === "ar" ? "إحصائيات وإنجازات السفر" : "Travel Stats & Badges"}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Trip Form Sheet */}
      {showTripForm && selectedCountry && (
        <TripForm
          country={selectedCountry}
          onSubmit={handleAddTripSubmit}
          onClose={() => setShowTripForm(false)}
          lang={lang}
        />
      )}
    </section>
  );
}
